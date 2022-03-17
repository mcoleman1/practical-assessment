import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Weather } from 'src/app/models/weather.model';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit, OnDestroy {

  public cityNameCtrl = new FormControl('Denver');
  public requestTime: Date = null;
  public weatherData: Weather;
  public weatherForm: FormGroup;

  private interval: any = null;

  constructor(private weatherService: WeatherService, private fb: FormBuilder) {
    this.weatherForm = this.fb.group({
      cityName: this.cityNameCtrl
    });
   }

  ngOnInit(): void {
    this.updateWeather();
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  /**
   * @function getWeatherData
   *
   * Calls the Weather Service to retrieve weather data for the provided city name.
   *
   * @param cityName (string) - name of the city to retrieve weather data for
   *
   * @returns void
   */
  public getWeatherData(cityName: string): void {
    const observer = {
      next: (data: Weather) => {
        this.weatherData = data;
        this.requestTime = new Date();
        this.cityNameCtrl.setErrors({ valid: true });
        this.cityNameCtrl.updateValueAndValidity();
      },
      error: (err: HttpErrorResponse) => {
        this.cityNameCtrl.setErrors({ valid: false });
        console.error(err.message);
      }
    };

    this.weatherService.getWeatherByCityName(cityName).subscribe(observer);
  }

  /**
   * @function updateWeather
   *
   * Automatically updates the weather data every 30 seconds for the current weather info in the template, assuming the data is valid.
   *
   * @returns void
   */
  private updateWeather(): void {
    const thirtySeconds = 30000;

    this.interval = setInterval(() => {
      if (this.weatherData) {
        this.getWeatherData(this.cityNameCtrl.value);
      }
    }, thirtySeconds);
  }

}
