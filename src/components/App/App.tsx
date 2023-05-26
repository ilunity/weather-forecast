import { useEffect, useState } from 'react';
import { Box, Container, CssBaseline } from '@mui/material';
import { lightBlue } from '@mui/material/colors';
import { weatherSimulation } from '../../utils/weather-simulation';
import { Q, WEATHER_TYPES } from '../../utils/consts';
import { WeatherCard } from '../WeatherCard';
import { FrequencyChart } from '../FrequencyChart';
import { FrequencyChartData } from '../FrequencyChart/FrequencyChart.types';
import { round } from '../../utils/round';


const initTime = new Date();
export const App: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<Date>(initTime);
  const [currentWeather, setCurrentWeather] = useState<number>(0);
  const [frequencies, setFrequencies] = useState<number[]>(new Array(5).fill(0));
  const [weatherChanges, setWeatherChanges] = useState<number>(0);

  useEffect(() => {
    const simulateWeather = weatherSimulation(Q, 0, initTime);

    const interval = setInterval(() => {
      const { time: newTime, weather: newWeather } = simulateWeather();

      setCurrentTime(new Date(+newTime));
      setCurrentWeather(newWeather);

      setFrequencies(prevState => prevState.map((value, index) => {
          return index === newWeather ? value + 1 : value;
        },
      ));
      setWeatherChanges(prevState => prevState + 1);

    }, 200);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const chart: FrequencyChartData[] = frequencies.map((count, index) => ({
    name: WEATHER_TYPES[index].name,
    freq: round(count / weatherChanges),
  }));

  return (
    <Container maxWidth={'xl'} sx={{ background: lightBlue[50] }}>
      <CssBaseline />
      <Box
        sx={{
          width: 1250,
          margin: '0 auto',
          px: 10,
          minHeight: '100vh',
          background: 'white',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <WeatherCard time={currentTime} weather={currentWeather} />
        <FrequencyChart data={chart} />
      </Box>
    </Container>
  );
};
