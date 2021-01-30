import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { groupBy, sortBy } from 'lodash';
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
  data: { [key: string]: WeatherForecastData[] } | null = null;

  constructor(private formBuilder: FormBuilder,
              private dataService: DataService) {}

  get controls(): { [key: string]: AbstractControl; } {
    return this.forecastForm.controls;
  }

  ngOnInit(): void {
    this.forecastForm = this.createFormModel();
    this.populateLocations();
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
    if (value === this.SELECT_LOCATION_PLACEHOLDER) {
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

    this.data = this.groupByButMaintainSortOrder(weatherData, 'day');
  }

  private groupByButMaintainSortOrder(data: WeatherForecastData[], property: string):
    { [key: string]: WeatherForecastData[] } {
    return sortBy(
      groupBy(data, property), (group) => data.indexOf(group[0])
    );
  }
}
