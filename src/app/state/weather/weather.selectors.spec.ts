import { selectWeatherData, selectWeatherLoading, selectWeatherError } from './weather.selectors';
import { WeatherState } from './weather.reducer';
import { Enums, Models, Ngrx } from '../../index';

describe('Weather Selectors', () => {
  it('should select weather data', () => {
    const weatherData = { name : 'Tehran' } as Models.WeatherData;
    const state: WeatherState = {
      weather : weatherData,
      status: Enums.StateStatus.Success,
      error: undefined,
    };
    const selected = selectWeatherData.projector(state);

    expect(selected).toBe(weatherData);
  });

  it('should select weather loading state', () => {
    const status = Enums.StateStatus.Loading;
    const state: WeatherState = {
      weather: undefined,
      status,
      error: undefined,
    };
    const selected = selectWeatherLoading.projector(state);

    expect(selected).toBe(status);
  });

  it('should select weather error state', () => {
    const error = 'An error occurred';
    const state: WeatherState = {
      weather: undefined,
      status: Enums.StateStatus.Error,
      error,
    };
    const selected = selectWeatherError.projector(state);

    expect(selected).toBe(error);
  });
});
