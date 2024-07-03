import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChart ({ data }) {
  const chartData = {
    labels: Object.keys(data),
    datasets: [{
      label: 'כמות',
      data: Object.values(data),
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'תרשים עמודות',
      },
    },
  };

  return (
    <div className="chart-container">
      <Bar options={options} data={chartData} />
    </div>
  );
};

