import { createAction, createReducer, on } from "@ngrx/store";
import { Enums, Models } from "src/app";
import { Actions } from ".";

export interface WeatherState {
  weather: Models.WeatherData | undefined,
  error?: string;
  status: Enums.StateStatus
}

export const initialState: WeatherState = {
  weather: undefined,
  error: undefined,
  status: Enums.StateStatus.NONE,
};

export const weatherReducer = createReducer(
  initialState,
  on(Actions.loadWeather, (state) => ({
    ...state,
    status: Enums.StateStatus.Loading,
  })),
  on(Actions.setWeather, (state, { weather }) => ({
    ...state,
    weather: weather,
    status: Enums.StateStatus.Success,
    error: undefined,
  })),
  on(Actions.weatherError, (state, { error }) => ({
    ...state,
    status: Enums.StateStatus.Error,
    error,
  })))
