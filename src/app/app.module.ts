import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherDetailComponent } from './components/weather-detail/weather-detail.component';
import { WeatherForecastComponent } from './components/weather-forecast/weather-forecast.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    WeatherForecastComponent,
    WeatherDetailComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
