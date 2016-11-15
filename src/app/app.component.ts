import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    authObject: Object;
    constructor(public af: AngularFire) {
        this.af.auth.subscribe(auth => {
            if (auth !== null) {
                this.authObject = this.getDisplay(auth);
                console.log('This Auth Object: ', this.authObject);
            }
            console.log('Auth Object: ', auth);
        },
        err => console.error('AF Error: ', err)
        );

        console.log('This Auth Object: ', this.authObject);
    }
  // title = 'app works!';
    login() {
        this.af.auth.login();
    }
    logout() {
        this.af.auth.logout();
        this.authObject = null;
    }

    private getDisplay (authObject) {
        return {
            name: authObject.auth.displayName,
            photo: authObject.auth.photoURL
        };
    }
}
