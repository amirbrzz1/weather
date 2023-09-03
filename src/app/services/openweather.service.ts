import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Models } from '..';

@Injectable({
  providedIn: 'root'
})
export class OpenweatherService {

  constructor(private http: HttpClient) { }

  getWeatherByLocation(location: Models.Location): Observable<Models.WeatherData> {
    const params = new HttpParams()
      .set('q', location.city ?? "")
      .set('lat', location.latitude ?? "")
      .set('lon', location.longitude ?? "")
      .set('appid', Models.openWeatherApiKey.key)
      .set('units', location.units ?? ""); // Use 'metric' for Celsius, 'imperial' for Fahrenheit

      return this.http.get<Models.WeatherData>(Models.openWeatherApiKey.api, { params }).pipe(
      catchError((error) => {
        console.error('Error fetching weather data:', error);
        throw error;
      })
    );
  }
}
