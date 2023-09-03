import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { hot, cold } from 'jasmine-marbles';

import { Ngrx , Models} from '../../index';

describe('Weather Effects', () => {
  let actions: Observable<any>;
  let effects: Ngrx.Weather.Effects.WeatherEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Ngrx.Weather.Effects.WeatherEffects,
        provideMockActions(() => actions),
      ],
    });

    effects = TestBed.inject(Ngrx.Weather.Effects.WeatherEffects);
  });

  it('should load weather data successfully', () => {
    const weatherData = { name : 'Tehran' } as Models.WeatherData;
    const action = Ngrx.Weather.Actions.loadWeather({ location: { city : 'Tehran' }});
    const completion = Ngrx.Weather.Actions.setWeather({ weather: weatherData });

    actions = hot('-a', { a: action });
    const expected = cold('-b', { b: completion });

    expect(effects.loadWeather$).toBeObservable(expected);
  });

});
