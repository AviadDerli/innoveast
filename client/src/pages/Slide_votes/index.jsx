import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { useSurveyStore } from '../../store';
import style from './style.module.css';

// רישום רכיבי Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function SlideVotes() {
  const responses = useSurveyStore((state) => state.responses);
  const [barData, setBarData] = useState({ labels: [], datasets: [] });
  const [pieData, setPieData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const booleanFields = [
      'advice', 'collaboration', 'contentEvents', 'entrepreneur', 'firstJob',
      'founder', 'investor', 'lecture', 'networking', 'nextJob',
      'promoteTechArea', 'promoteWomenTech', 'recruiting', 'resume', 'startup', 'teenagers'
    ];

    const booleanCounts = booleanFields.reduce((acc, field) => {
      acc[field] = 0;
      return acc;
    }, {});

    responses.forEach(response => {
      booleanFields.forEach(field => {
        if (response[field]) {
          booleanCounts[field] += 1;
        }
      });
    });

    const sortedBooleanCounts = Object.entries(booleanCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4);

    const labels = sortedBooleanCounts.map(([field]) => field);
    const counts = sortedBooleanCounts.map(([, count]) => count);
    const backgroundColors = ['#002f34', '#007072', '#83e1d1', '#90e702'];

    setBarData({
      labels: labels,
      datasets: [
        {
          label: 'Count',
          data: counts,
          backgroundColor: backgroundColors,
          borderColor: '#07161b',
          borderWidth: 1,
        },
      ],
    });

    setPieData({
      labels: labels,
      datasets: [
        {
          label: 'Count',
          data: counts,
          backgroundColor: backgroundColors,
          borderColor: '#07161b',
          borderWidth: 1,
        },
      ],
    });
  }, [responses]);

  return (
    <div className={style.container}>
      <div className={style.chart}>
        <Bar
          data={barData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: true,
              },
              title: {
                display: true,
                text: 'Top 4 Boolean Responses - Bar Chart',
              },
            },
          }}
        />
      </div>
      <div className={style.chart}>
        <Pie
          data={pieData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: true,
              },
              title: {
                display: true,
                text: 'Top 4 Boolean Responses - Pie Chart',
              },
            },
          }}
        />
      </div>
    </div>
  );
}
