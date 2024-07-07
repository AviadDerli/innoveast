import React, { useEffect, useRef } from 'react';
import { useSurveyStore } from '../../store';
import WordCloud from 'wordcloud'; // יבוא של WordCloud.js


export default function Jobes() {

  const responses = useSurveyStore((state) => state.responses);
  const wordCloudRef = useRef(null);

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
    const colors = [
      '#007072', /* Primary color */
      '#83e1d1', /* Light primary color */
      '#90e702', /* Text color */
      '#005f60', /* Mid primary color */
      '#a3e6e1', /* Light secondary color */
      '#004e50', /* Dark primary color */
      '#6ac5b9', /* Mid secondary color */
      '#008a7a', /* Accent color */
      '#6ca300'  /* Secondary text color */
    ];
    

    WordCloud(wordCloudRef.current, {
      list: words,
      gridSize: Math.round(16 * window.innerWidth / 1024),
      weightFactor: size => Math.log2(size + 1) * 25,
      color: (word, weight) => colors[Math.floor(Math.random() * colors.length)], // בחירת צבע רנדומלי מהמערך
      rotateRatio: 0.5,
      rotationSteps: 2,
      backgroundColor: '#002f34',
      fontWeight: 'bold',
      drawOutOfBound: false,

    });


  }, [responses]);

  return (
      <div ref={wordCloudRef} style={{ width: '50vw', height: '50vh' }}></div>
  )
}
