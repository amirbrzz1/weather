import { createSelector, createFeatureSelector } from '@ngrx/store';
import { WeatherState } from './weather.reducer';
import { AppState } from '../app-state';

export const selectWeatherState = (state: AppState) => state.weather;

export const selectWeatherData = createSelector(
  selectWeatherState,
  (state: WeatherState) => {
    return state?.weather
  }
);

export const selectWeatherLoading = createSelector(
  selectWeatherState,
  (state: WeatherState) => state?.status
);

export const selectWeatherError = createSelector(
  selectWeatherState,
  (state: WeatherState) => state?.error
);
