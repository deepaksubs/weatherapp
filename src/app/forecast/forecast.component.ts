import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { WeatherService } from '../shared/services/weather.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  loc$: Observable<string>;
  loc: string;
  liveWeather: any = <any> {};
  forecast: any = <any> {};
  message: string;

  constructor(private store: Store<any>, private weatherService: WeatherService) {
    this.loc$ = store.pipe(select('loc'));
    this.loc$.subscribe(loc => {
      this.loc = loc;
      this.search(loc);
    });
  }

  ngOnInit() {
  }

  search(loc: string) {
    this.message = '';
    this.liveWeather = {};
    this.weatherService.getCurrentWeather(loc)
      .subscribe(res => {
        this.liveWeather = res;
      }, err => {
}, () => {
        this.searchForecast(loc);
      });
  }

  searchForecast(loc: string) {
    this.weatherService.getForecast(loc)
      .subscribe(res => {
        this.forecast = res;
      }, err => {
    });
  }

  resultFound() {
    return Object.keys(this.liveWeather).length > 0;
  }
}
