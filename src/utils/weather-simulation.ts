import addDays from 'date-fns/addDays';
import { Random } from './random';

interface WeatherSimulationStep {
  time: Date;
  weather: number;
}

const incrementTime = (date: Date, increment: number) => {
  let incrementTime = Math.round(increment);
  incrementTime = incrementTime >= 1 ? incrementTime : 1;

  date.setHours(date.getHours() + incrementTime);
  addDays(date, incrementTime);
};

export const weatherSimulation = (Q: number[][], current: number, initTime: Date) => {
  let currentWeather = current;
  const currentTime = new Date(+initTime),
    nextTime = new Date(+initTime);

  const { time, nextEvent } = Random.ContinuousMarkovProcess(Q, currentWeather);
  incrementTime(nextTime, time);
  let nextWeather = nextEvent;

  const simulateStep = (): WeatherSimulationStep => {
    incrementTime(currentTime, 1);

    if (currentTime.getTime() < nextTime.getTime()) {
      return {
        time: currentTime,
        weather: currentWeather,
      };
    }


    const ret: WeatherSimulationStep = {
      time: currentTime,
      weather: nextWeather,
    };

    const { time, nextEvent } = Random.ContinuousMarkovProcess(Q, currentWeather);
    incrementTime(nextTime, time);
    nextWeather = nextEvent;
    currentWeather = nextEvent;

    return ret;
  };

  return simulateStep;
};
