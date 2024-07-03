
import React, { useEffect, useRef } from 'react'; // יבוא של React, useEffect ו-useRef מ-React
import { useSurveyStore } from '../../store'; // יבוא של useSurveyStore מה-store
import WordCloud from 'wordcloud'; // יבוא של WordCloud.js
import { useNavigate } from 'react-router-dom';

export default function SlideWorks() {
  const responses = useSurveyStore((state) => state.responses); // קבלת התגובות מה-store באמצעות useSurveyStore
  const wordCloudRef = useRef(null); // יצירת reference ל-DOM אלמנט כדי שנוכל להשתמש בו ב-WordCloud.js
  const navigate = useNavigate()

  useEffect(() => { // שימוש ב-useEffect להפעלת הקוד כשהתגובות משתנות
    const jobs = responses.map(response => {
      return response.jobTitle && response.workplace 
        ? `${response.jobTitle} at ${response.workplace}` 
        : response.jobTitle || response.workplace;
    }).filter(Boolean);
        const jobsCounts = jobs.reduce((acc, job) => { // חישוב מספר הפעמים שכל מקום מופיע
      acc[job] = (acc[job] || 0) + 1; // אם המקום כבר קיים במערך, הגדל את הספירה, אחרת התחל ב-1
      return acc; // החזרת האובייקט המעודכן
    }, {}); // ערך התחלתי הוא אובייקט ריק

    const words = Object.entries(jobsCounts).map(([word, count]) => [word, count]); // הפיכת האובייקט למערך של מערכים עם מילה ומספר הופעותיה
    words.push(['עובדים ב', 100]); // הוספת המילה "FROM" עם גודל גבוה כדי שתהיה במרכז

    WordCloud(wordCloudRef.current, { // קריאה ל-WordCloud.js עם הפרמטרים הדרושים
      list: words, // רשימת המילים והספירות
      gridSize: Math.round(16 * window.innerWidth / 1024), // גודל הגריד בהתאמה לרוחב החלון
      weightFactor: size => Math.log2(size + 1) * 10, // פונקציה להתאמת הגודל בהתאם לספירה
    //   fontFamily: 'Times, serif', // משפחת הפונטים
      color: 'random-light', // צבע אקראי כהה
      rotateRatio: 0.5, // יחס הסיבוב של המילים
      rotationSteps: 2, // שלבי הסיבוב (0 או 90 מעלות)
      backgroundColor: '#002f34', // צבע הרקע של הענן מילים
      drawOutOfBound: false, // מניעת ציור מחוץ לתחום האלמנט
    });
  }, [responses]); // useEffect יפעל מחדש כל פעם שהתגובות ישתנו

  return <>
  <div ref={wordCloudRef} style={{ width: '100%', height: '600px' }}></div>
  <button onClick={()=>navigate('/votes')}>המשך</button>

</>}


