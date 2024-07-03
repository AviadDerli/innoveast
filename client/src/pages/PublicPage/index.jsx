import React, { useEffect, useRef, useState } from 'react';
import WordCloudComp from '../../components/WordCloudComp';
import BarChart from '../../components/BarChart'
import PieChart from '../../components/PieChart'
import { useSurveyStore } from '../../store';

export default function PublicPage() {
  const canvasRef = useRef(null);
  const allResponses = useSurveyStore((state) => state.allResponses);
  const [barData, setBarData] = useState({});
  const [pieData, setPieData] = useState({});

  useEffect(() => {
    const barChartData = {};
    const pieChartData = {};
    const booleanFields = [
      'lecture', 'advice', 'investor', 'teenagers', 'startup', 'founder',
      'entrepreneur', 'networking', 'contentEvents', 'recruiting', 'resume',
      'nextJob', 'firstJob', 'collaboration', 'promoteTechArea', 'promoteWomenTech'
    ];
    const pieChartFields = booleanFields.slice(0, 8);
    const barChartFields = booleanFields.slice(8);

    allResponses.forEach(response => {
      Object.entries(response).forEach(([key, value]) => {

        if (pieChartFields.includes(key) && value) {
          pieChartData[key] = (pieChartData[key] || 0) + 1;

        } else if (barChartFields.includes(key) && value) {
          barChartData[key] = (barChartData[key] || 0) + 1;

        }
      });
    });


    setBarData(barChartData);
    setPieData(pieChartData);
  }, [allResponses]);

  return (
    <div className="word_cloud_page">
      <div className="charts_container">
        <div className="word_cloud">
          <WordCloudComp/>
        </div>
        <div className="bar_chart">
          <BarChart data={barData} />
        </div>
        <div className="pie_chart">
          <PieChart data={pieData} />
        </div>
      </div>
    </div>
  );
};

