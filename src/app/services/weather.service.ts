import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Weather } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private key: string = 'cb30274dd5881105ceffc9f90e9b94d3';

  constructor(private http: HttpClient) { }

  /**
   * @function getWeatherByCityName
   *
   * Retrieves the current weather data for the provided city name.
   *
   * @param cityName (string) - the city to retrieve weather data for
   *
   * @returns (Observable<Weather>) - the response from the server wrapped in an Observable
   */
  public getWeatherByCityName(cityName: string): Observable<Weather> {
    return this.http.get<Weather>(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${this.key}`);
  }
}
