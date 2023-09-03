import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { OpenweatherService } from './openweather.service';
import { Models } from '..';


describe('OpenweatherService', () => {
  let service: OpenweatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OpenweatherService],
    });
    service = TestBed.inject(OpenweatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve weather data based on location', inject(
    [HttpTestingController],
    (httpClient: HttpTestingController) => {
      const location: Models.Location = { city: 'Tehran' };
      const mockWeatherData = {
        name : 'Tehran',
        sys : {
          country : 'IR'
        }
      } as Models.WeatherData ;

      service.getWeatherByLocation(location).subscribe((data) => {
        expect(data.name).toEqual(mockWeatherData.name);
        expect(data.sys.country).toEqual(mockWeatherData.sys.country);
      });

      // Define the expected HTTP request
      const req = httpMock.expectOne(
        (request) =>
          request.url === 'https://api.openweathermap.org/data/2.5/weather' &&
          request.method === 'GET'
      );

      // Respond with mock data
      req.flush(mockWeatherData);
    }
  ));
});
