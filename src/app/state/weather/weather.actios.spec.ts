import { Ngrx , Models} from '../../index';

describe('Weather Actions', () => {
  it('should create a LoadWeather action', () => {
    const action = Ngrx.Weather.Actions.loadWeather({ location: { city: 'Tehran' } });

    expect({ ...action }).toEqual({
      type: Ngrx.Weather.Actions.loadWeather.type,
      location: { city: 'Tehran' },
    });
  });

  it('should create a SetWeather action', () => {
    const weatherData = { name: 'Tehran', sys: { country: 'IR' } } as Models.WeatherData;
    const action = Ngrx.Weather.Actions.setWeather({ weather: weatherData });

    expect({ ...action }).toEqual({
      type: Ngrx.Weather.Actions.setWeather.type,
      weather: { name: 'Tehran', sys: { country: 'IR' } } as Models.WeatherData,
    });
  });

  it('should create a WeatherError action', () => {
    const error = 'An error occurred';
    const action = Ngrx.Weather.Actions.weatherError({ error });

    expect({ ...action }).toEqual({
      type: Ngrx.Weather.Actions.weatherError.type,
      error,
    });
  });
});
