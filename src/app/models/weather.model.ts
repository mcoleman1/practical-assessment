export interface Weather {
  base: string;
  clouds: any;
  cod: number;
  coord: { lon: number, lat: number };
  dt: number;
  id: number;
  main: WeatherMain;
  name: string;
  snow: any,
  sys: WeatherSystem;
  timezone: number;
  visibility: number;
  weather: Array<WeatherInfo>;
  wind: Wind;
}

interface WeatherInfo {
  description: string;
  icon: string;
  id: number;
  main: string;
}

interface WeatherMain {
  feels_like: number;
  humidity: number;
  pressure: number;
  temp: number;
  temp_max: number;
  temp_min: number;
}

interface WeatherSystem {
  country: string;
  id: number;
  sunrise: number;
  sunset: number;
  type: number;
}

interface Wind {
  deg: number;
  gust: number;
  speed: number;
}
