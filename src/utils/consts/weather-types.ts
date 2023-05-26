import { clearSkyIcon, rainIcon, scatteredClouds, snowIcon, thunderstormIcon } from '../../assets/weather-icons';

interface WeatherObject {
  name: string;
  img: string;
}

export const WEATHER_TYPES: WeatherObject[] = [
  {
    name: 'Clear sky',
    img: clearSkyIcon,
  },
  {
    name: 'Scattered clouds',
    img: scatteredClouds,
  },
  {
    name: 'Rain',
    img: rainIcon,
  },
  {
    name: 'Thunderstorm',
    img: thunderstormIcon,
  },
  {
    name: 'Snow',
    img: snowIcon,
  },
];
