import React from 'react';
import { FrequencyChartProps } from './FrequencyChart.types';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';


export const FrequencyChart: React.FC<FrequencyChartProps> = ({ data }) => {
  return (
    <BarChart
      data={data}
      height={500}
      width={600}
    >
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='name' />
      <YAxis domain={[0, 1]} />
      <Tooltip />
      <Legend />
      <Bar dataKey='freq' fill='#8884d8' />
    </BarChart>
  );
};
