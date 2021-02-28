import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { groupBy } from 'lodash';
import { Observable } from 'rxjs';
import { DataService } from '../../data/data.service';
import { WeatherForecastData } from '../../data/weather-data';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css']
})
export class WeatherForecastComponent implements OnInit {

  readonly SELECT_LOCATION_PLACEHOLDER = 'Select location';

  forecastForm: FormGroup;
  locations: Observable<string[]>;
  translations: any;
  data: { [key: number]: WeatherForecastData[] } | null;

  constructor(private formBuilder: FormBuilder,
              private dataService: DataService,
              private translate: TranslateService) {}

  get controls(): { [key: string]: AbstractControl; } {
    return this.forecastForm.controls;
  }

  ngOnInit(): void {
    this.loadTranslations();
    this.forecastForm = this.createFormModel();
    this.populateLocations();
  }

  private loadTranslations(): void {
    this.translate.get('weather')
      .subscribe(translations => {
        this.translations = translations;
      });
  }

  private createFormModel(): FormGroup {
    return this.formBuilder.group({
      location: ''
    });
  }

  private populateLocations(): void {
    this.locations = this.dataService.getLocations();
  }

  getWeather(value: string): void {
    if (value === this.translations['select.placeholder']) {
      this.data = null;
      return;
    }

    this.dataService.getForecast(value)
      .subscribe(
        this.updateData,
        error => console.log(error)
      );
  }

  private updateData = (data: any) => {
    const weatherData = data.list.map((item) => {
      const dateTime = new Date(item.dt * 1000);
      const dayNumber = dateTime.getDay();
      return {
        day: dayNumber,
        date: dateTime,
        weather: item.weather,
        temperature: item.main.temp,
        windSpeed: item.wind.speed
      } as WeatherForecastData;
    });

    this.data = groupBy(weatherData, 'day');
  }

  /* private groupByButMaintainSortOrder(data: WeatherForecastData[], property: string):
    { [key: string]: WeatherForecastData[] } {
    return sortBy(
      groupBy(data, property), (group) => data.indexOf(group[0])
    );
  } */
}
