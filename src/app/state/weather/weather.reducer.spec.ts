import { Enums, Models, Ngrx } from '../../index';
import { weatherReducer, initialState } from './weather.reducer';

describe('Weather Reducer', () => {
  it('should return the initial state', () => {
    const action = {} as any; // A dummy action
    const state = weatherReducer(undefined, action);

    expect(state).toBe(initialState);
  });

  it('should set weather data on SetWeather action', () => {
    const weatherData = { name : 'Tehran' } as Models.WeatherData;
    const action = Ngrx.Weather.Actions.setWeather({ weather: weatherData });
    const state = weatherReducer(initialState, action);

    expect(state.weather).toEqual(weatherData);
    expect(state.status).toBe(Enums.StateStatus.Success)
    expect(state.error).toBeNull();
  });

  it('should handle error on WeatherError action', () => {
    const error = 'An error occurred';
    const action = Ngrx.Weather.Actions.weatherError({ error });
    const state = weatherReducer(initialState, action);

    expect(state.error).toEqual(error);
    expect(state.status).toBe(Enums.StateStatus.Error);
  });
});
