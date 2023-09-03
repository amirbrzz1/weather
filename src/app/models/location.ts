export class Location {
  latitude?: number;
  longitude?: number;
  city? : string;
  units? : 'standard' | 'metric' | 'imperial' = 'metric'; // Use 'metric' for Celsius, 'imperial' for Fahrenheit
}
