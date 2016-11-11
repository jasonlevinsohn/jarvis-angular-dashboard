import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class WeatherService {

  constructor(private http: Http) { }

    /**
     * Returns an Observable for the HTTP GET request
     * @return {string[]} The Observable for the HTTP request
     */
    get(): Observable<string[]> {
        return this.http.get('http://localhost:8000/api/forecast/')
                        .map((res: Response) => res.json())
                        .catch(this.handleError);
    }

    /**
     * Handle HTTP Error
     */
    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server Error';

        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}
