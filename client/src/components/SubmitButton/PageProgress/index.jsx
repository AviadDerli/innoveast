import React, { useEffect, useState } from 'react';
import style from './style.module.scss';

export default function PageProgress({ targetProgress }) {
    const [progress, setProgress] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev < targetProgress) {
            return prev + 1;
          }
          clearInterval(interval);
          return prev;
        });
      }, 10); // שינוי כל 10 מילישניות כדי שהאנימציה תהיה חלקה
  
      return () => clearInterval(interval);
    }, [targetProgress]);
  
    const progressPercentage = `${progress}%`;
  
    return (
      <div dir='rtl' className={style.container}>
        <div className={style.progress}>
          <div
            className={style['progress-bar']}
            style={{ width: progressPercentage, backgroundColor: getBackgroundColor(progress) }}
          ></div>
        </div>
      </div>
    );
  }
  
  function getBackgroundColor(progress) {
    if (progress <= 5) return '#83e1d1';
    if (progress <= 25) return '#90e702';
    if (progress <= 50) return '#83e1d1';
    if (progress <= 75) return '#90e702';
    return '#86e01e';
  }



