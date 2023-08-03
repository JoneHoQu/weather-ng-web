import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WeatherService } from './service/weather.service';
import { WeatherData } from './model/weather.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'weatherApp';
  
  cityName: string = 'guangzhou';

  weatherDescribe = 'sunny'

  weatherData?: WeatherData 

  // 获取当前日期
  today = new Date()
  time!: string | null;
  pipe = new DatePipe('en-US');

  constructor(private apiService: WeatherService) { }

  ngOnInit() {
    this.changeFormat();
    this.getWeatherData(this.cityName);
  };

  onSubmit() {
    this.getWeatherData(this.cityName);
    this.cityName='';
  };

  changeFormat() {
    let ChangedFormat = this.pipe.transform(this.today, 'YY.MM.dd');
    this.time = 'Today,' + ChangedFormat;
  };

  getWeatherData(cityName: string) {
    this.apiService.getWeatherData(cityName)
      .subscribe({
        next: (response) => {
          this.weatherData = response;
          console.log(response);
          console.log(response.locations[cityName].address);
        }
      })
  }
}
