import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { WeatherService } from '../shared/services/weather.service';

@Component({
  selector: 'app-uv',
  templateUrl: './uv.component.html',
  styleUrls: ['./uv.component.css']
})
export class UvComponent implements OnInit {
  loc$: Observable<string>;
  loc: string;
  liveWeather: any = <any> {};
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

      }, () => {
        this.searchUv(loc);
      });
  }

  searchUv(loc: string) {
    this.weatherService.getUv(this.liveWeather.coord.lat,
      this.liveWeather.coord.lon)
      .subscribe(res => {
        this.uv = res as any [];
      }, err => {

      });
  }

  resultFound() {
    return Object.keys(this.liveWeather).length > 0;
  }
}
