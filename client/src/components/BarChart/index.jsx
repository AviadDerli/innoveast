import React, { useEffect, useState } from 'react';
import 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';
import { useSurveyStore } from '../../store';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);



export default function BarChart() {
  const responses = useSurveyStore((state) => state.responses);
  const [barData, setBarData] = useState({ labels: [], datasets: [] });
  const translations = {
    advice: "אני רוצה לייעץ לסטארטאפים",
    collaboration: "יש לי רעיון לשיתוף פעולה עסקי עם אינוביסט",
    contentEvents: "מעניין אותי התוכן והאירועים שהקהילה יכולה להציע",
    entrepreneur: "אני יזם או יזמת בנשמה",
    firstJob: "בחיפוש עבודה ראשונה בהייטק",
    founder: "אני פאונדר/ית בסטארטאפ",
    investor: "אני משקיע/ה ורוצה להצטרף למועדון האנג'לים",
    lecture: "אשמח לשתף מהידע שלי ולהעביר הרצאה ליזמים והייטקיסטים",
    networking: "אשמח להכיר את האנשים הנכונים להתייעץ איתם באתגרים מקצועיים",
    nextJob: "בחיפוש אחר התפקיד הבא שלי",
    promoteTechArea: "חשוב לי לקדם הייטק באזור",
    promoteWomenTech: "חשוב לי לקדם נשים בהייטק",
    recruiting: "אני מגייס עובדים ועובדות ואני רוצה להביא את האנשים הכי טובים",
    resume: "רוצה להעביר קורות חיים רלוונטיים למשרות בחברה שלי",
    startup: "מדגדג לי להקים או להצטרף לסטארטאפ",
    teenagers: "אני רוצה להיפגש עם בני נוער ולחשוף אותם לעולמות ההייטק",
  };

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

    const labels = sortedBooleanCounts.map(([field]) => translations[field] || field);
    const counts = sortedBooleanCounts.map(([, count]) => count);
    const backgroundColors = ['#fff', '#007072', '#83e1d1', '#90e702'];

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

  }, [responses]);
  return (
      <Bar
        data={barData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              // text: 'ארבע התגובות שהצביעו להן הכי הרבה בצורת עמודות',
              font: {
                size: 18, // Adjust the size as needed
              },
            },
            datalabels: {
              anchor: 'end',
              align: 'top',
              formatter: (value) => value,
              color: '#000',
              font: {
                weight: 'bold',
              },
            },
            annotation: {
              annotations: barData.labels.map((label, index) => ({
                type: 'label',
                content: `${index + 1}`,
                position: {
                  x: 'end',
                  y: barData.datasets[0].data[index]
                },
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                font: {
                  size: 12,
                  weight: 'bold',
                },
                color: '#000',
                xAdjust: -10,
                yAdjust: -10,
              }))
            }
          },
        }}
      />
  )
}
