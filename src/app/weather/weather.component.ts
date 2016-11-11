import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../shared/services/index';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})

export class WeatherComponent implements OnInit {
    forecast: any[] = [];
    names: any[] = [];
    errorMessage: string;
    forecastData: Object = {};

    constructor(public weatherService: WeatherService) {
        console.log('Dashboard Weather Widget');
    }

    ngOnInit() {
        this.getForecast();
    }

    getForecast() {
        this.weatherService.get()
            .subscribe(
                forecast => {
                    this.setForecastVars(forecast);
                },
                error => this.errorMessage = <any>error
            );
    }

    setForecastVars(forecastObj: any) {
        let current: any = {};

        current = forecastObj.currently;

        this.forecastData = {
            temperature: Math.round(current.temperature),
            stormDistance: current.nearestStormDistance,
            stormBearing: this.getEnumBearing(current.nearestStormBearing),
            precipProb: current.precipProbability,
            precipType: current.precipType,
            summary: current.summary,
            icon: current.icon,
            windSpeed: current.windSpeed,
            windBearing: this.getEnumBearing(current.windBearing)
        };

        console.log('Current Forecast Data: %o', this.forecastData);
    }

    getEnumBearing(trueBearing: number) {
        let enumBearing: string;

        /**
         * 360 / 8 = 45
         * Either side of that is 22.5, but we are going
         * to just stick with 22 or 23
         */
        if (trueBearing > 338 || trueBearing <= 22) {
            enumBearing = 'n';
        } else if (trueBearing > 22 && trueBearing <= 67) {
            enumBearing = 'ne';
        } else if (trueBearing > 67 && trueBearing <= 112) {
            enumBearing = 'e';
        } else if (trueBearing > 112 && trueBearing <= 156) {
            enumBearing = 'se';
        } else if (trueBearing > 156 && trueBearing <= 202) {
            enumBearing = 's';
        } else if (trueBearing > 202 && trueBearing <= 246) {
            enumBearing = 'sw';
        } else if (trueBearing > 246 && trueBearing <= 292) {
            enumBearing = 'w';
        } else if (trueBearing > 292 && trueBearing <= 338) {
            enumBearing = 'nw';
        };

        return enumBearing;
    }
}

