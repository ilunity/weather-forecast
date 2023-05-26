import React from 'react';
import { WeatherCardProps } from './WeatherCard.types';
import { lightBlue } from '@mui/material/colors';
import { Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import { format } from 'date-fns';
import { WEATHER_TYPES } from '../../utils/consts';

export const WeatherCard: React.FC<WeatherCardProps> = ({ time, weather }) => {
  return (
    <Card
      sx={{
        width: 200,
        background: lightBlue[200],
        flexGrow: '0',
      }}
    >
      <CardContent>
        <Typography variant={'h5'} color={'primary'}>
          neTomsk
        </Typography>
        <Stack
          direction={'row'}
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant={'h6'}>
            {format(time, 'HH:00')}
          </Typography>
          <Typography>
            {format(time, 'd MMM yyyy')}
          </Typography>
        </Stack>
      </CardContent>
      <CardMedia
        component={'img'}
        sx={{
          width: 150,
          margin: '0 auto',
        }}
        image={WEATHER_TYPES[weather].img}
      />
      <CardContent>
        {` ${WEATHER_TYPES[weather].name}`}
      </CardContent>
    </Card>
  );
};
