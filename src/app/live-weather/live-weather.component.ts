import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { WeatherService } from '../shared/services/weather.service';

@Component({
  selector: 'app-live-weather',
  templateUrl: './live-weather.component.html',
  styleUrls: ['./live-weather.component.css']
})
export class LiveWeatherComponent implements OnInit {
  loc$: Observable<string>;
  loc: string;
  liveWeather: any = <any>{};
  uv: any[] = [];
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
        if (err.error && err.error.message) {
          alert(err.error.message);
          this.message = err.error.message;
          return;
        }
        alert('Failed to get weather.');
      }, () => {
    });
  }

  resultFound() {
    return Object.keys(this.liveWeather).length > 0;
  }

}
