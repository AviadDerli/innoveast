import React, { useEffect, useRef } from 'react';
import { useSurveyStore } from '../../store';
import WordCloud from 'wordcloud';
import { useNavigate } from 'react-router-dom';
import style from './style.module.scss';

export default function SlideWorks() {
  const responses = useSurveyStore((state) => state.responses);
  const wordCloudRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const jobTitles = responses.map(response => response.jobTitle).filter(Boolean);
    const workplaces = responses.map(response => response.workplace).filter(Boolean);

    const jobTitlesCounts = jobTitles.reduce((acc, jobTitle) => {
      acc[jobTitle] = (acc[jobTitle] || 0) + 1;
      return acc;
    }, {});

    const workplacesCounts = workplaces.reduce((acc, workplace) => {
      acc[workplace] = (acc[workplace] || 0) + 1;
      return acc;
    }, {});

    const jobWords = Object.entries(jobTitlesCounts).map(([word, count]) => [word, count]);
    const workplaceWords = Object.entries(workplacesCounts).map(([word, count]) => [word, count]);

    const words = [...jobWords, ...workplaceWords]; // איחוד הרשימות של תפקידים ומיקומים
    words.push(['עובדים ב', 100]); // הוספת המילה "FROM" עם גודל גבוה כדי שתהיה במרכז

    WordCloud(wordCloudRef.current, {
      list: words,
      gridSize: Math.round(16 * window.innerWidth / 1024),
      weightFactor: size => Math.log2(size + 1) * 10,
      color: 'random-light',
      rotateRatio: 0.5,
      rotationSteps: 2,
      backgroundColor: '#002f34',
      drawOutOfBound: false,
    });
  }, [responses]);

  return (
    <div onClick={() => navigate('/votes')} className={style.container}>
      <div ref={wordCloudRef} style={{ width: '100%', height: '600px' }}></div>
    </div>
  );
}
