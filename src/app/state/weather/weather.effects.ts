import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Services } from '../../index';
import { loadWeather, setWeather, weatherError } from './weather.actios';
import * as Sentry from "@sentry/angular-ivy";

@Injectable()
export class WeatherEffects {
  constructor(
    private actions$: Actions,
    private _openweatherService: Services.OpenweatherService
  ) { }

  loadWeather$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadWeather),
      switchMap((action) =>
        this._openweatherService.getWeatherByLocation(action.location).pipe(
          map((data) => {
            Sentry.captureMessage(`api called successfully for ${data.name}`)
            return setWeather({ weather: data })
          }),
          catchError((error) => {
            Sentry.captureException(new Error(`an error occured in getting weather for ${JSON.stringify(action.location)}`, { cause: error }))
            return of(weatherError({ error }))
          }
          )
        )
      )
    ));
}
