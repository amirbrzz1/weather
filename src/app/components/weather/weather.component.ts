import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Ngrx, Services, Models, Enums } from '../../';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent {

  loadingEnum = Enums.StateStatus;
  public weatherData?: Models.WeatherData;
  public loading: Enums.StateStatus = Enums.StateStatus.NONE;
  public error: any | undefined;
  public units: 'standard' | 'metric' | 'imperial' = 'metric'

  constructor(private _locationService: Services.LocationService, private store: Store<Ngrx.AppState>) {
    this.store.select(Ngrx.Weather.Selector.selectWeatherData).subscribe(data => {
      this.weatherData = data;
    });
    this.store.select(Ngrx.Weather.Selector.selectWeatherLoading).subscribe(loading => {
      this.loading = loading;
    });
    this.store.select(Ngrx.Weather.Selector.selectWeatherError).subscribe(error => {
      this.error = error;
      setTimeout(() => {
        this.getUserLocation();
      }, 5000);
    });
  }

  ngOnInit() {
    this.getUserLocation();
  }

  getUserLocation(){
    this._locationService.getUserLocation()
    .subscribe({
      next: (response: Models.Location) => {
        response.units = this.units;
        this.store.dispatch(Ngrx.Weather.Actions.loadWeather({ location: response }));
      }, error: (error) => {

      }
    })

  }

  search(cityName: string) {
    if (cityName) {
      this.store.dispatch(Ngrx.Weather.Actions.loadWeather({ location: { city: cityName, units: this.units } as Models.Location }));
    }
  }

}
