export interface WeatherForecastData {
    day: number;
    date: Date;
    weather: any;
    temperature: number;
    windSpeed: number;
}

export interface WeatherData {
    icons: string[];
    description: string[];
}
