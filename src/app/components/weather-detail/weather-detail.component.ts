import { Component, Input } from '@angular/core';
import { WeatherForecastData } from 'src/app/data/weather-data';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-weather-detail',
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./weather-detail.component.css']
})
export class WeatherDetailComponent {

  @Input() location: string | null = null;
  @Input() data: { [key: number]: WeatherForecastData[] } = {};

  getImageSrcUrl(iconCode: string): string {
    return `${environment.BASE_URL}/img/w/${iconCode}.png`;
  }
}
