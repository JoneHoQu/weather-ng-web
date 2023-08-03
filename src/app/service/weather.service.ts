import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WeatherData } from '../model/weather.models';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeatherData (cityName: string):Observable<WeatherData>{
    return this.http.get<WeatherData>(environment.weatherAPIbasicUrl,
      {
        headers: new HttpHeaders()
          .set(environment.XRapidAPIHostName, environment.XRapidAPIHostValue)
          .set(environment.XRapidAPIKeyName, environment.XRapidAPIKeyValue),
        params: new HttpParams()
          .set('aggregateHours', 24)
          .set('location', cityName)
          .set('contentType', 'json')
          .set('unitGroup', 'metric')
          .set('shortColumnNames',true)
      }
    );
  }
}
