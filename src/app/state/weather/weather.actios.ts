import { createAction, props } from '@ngrx/store';
import { Models } from '../..';

export const loadWeather = createAction(
  '[Weather] Load Weather',
  props<{ location: Models.Location }>()
);

export const setWeather = createAction(
  '[Weather] Set Weather',
  props<{ weather: Models.WeatherData }>()
);

export const weatherError = createAction(
  '[Weather] Weather Error',
  props<{ error: any }>()
);

