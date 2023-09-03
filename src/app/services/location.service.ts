import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Models } from '..';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  getUserLocation(): Observable<Models.Location> {
    return new Observable((observer) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            observer.next({
              city: "",
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
            observer.complete();
          },
          (error) => observer.error(error)
        );
      } else {
        this.getectUserIp()
          .subscribe({
            next: (res: Models.IpInfoResponse) => {
              observer.next({
                city: res.city ?? "",
                latitude: res.latitude ?? 0,
                longitude: res.longitude ?? 0
              });
              observer.complete();
            }, error: (error) => {
              observer.error('Geolocation is not available.');
            }
          })
      }
    });
  }

  getectUserIp() {
    return this.http.get<Models.IpInfoResponse>('https://ipinfo.io/json')
  }
}
