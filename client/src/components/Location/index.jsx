import React, { useEffect, useRef } from 'react'; // יבוא של React, useEffect ו-useRef מ-React
import { useSurveyStore } from '../../store'; // יבוא של useSurveyStore מה-store
import WordCloud from 'wordcloud'; // יבוא של WordCloud.js

export default function Location() {

  const responses = useSurveyStore((state) => state.responses); // קבלת התגובות מה-store באמצעות useSurveyStore
  const wordCloudRef = useRef(null); // יצירת reference ל-DOM אלמנט כדי שנוכל להשתמש בו ב-WordCloud.js


  useEffect(() => { // שימוש ב-useEffect להפעלת הקוד כשהתגובות משתנות
    const locations = responses.map(response => response.location).filter(Boolean); // מיפוי התגובות להוצאת מקומות המגורים וסינון ערכים ריקים
    const locationCounts = locations.reduce((acc, location) => { // חישוב מספר הפעמים שכל מקום מופיע
      acc[location] = (acc[location] || 0) + 1; // אם המקום כבר קיים במערך, הגדל את הספירה, אחרת התחל ב-1
      return acc; // החזרת האובייקט המעודכן
    }, {}); // ערך התחלתי הוא אובייקט ריק

    const words = Object.entries(locationCounts).map(([word, count]) => [word, count]); // הפיכת האובייקט למערך של מערכים עם מילה ומספר הופעותיה
    const colors = ['#7ad7c7', '#369c47', '#317269', '#83e1d1', '#84e2b7', '#84e2b7', '#7ed661', '#77cbaa', '#6ab597', '#5c9e84'];

    WordCloud(wordCloudRef.current, { // קריאה ל-WordCloud.js עם הפרמטרים הדרושים
      list: words, // רשימת המילים והספירות
      gridSize: Math.round(16 * window.innerWidth / 1024), // גודל הגריד בהתאמה לרוחב החלון
      weightFactor: size => Math.log2(size + 1) * 17, // פונקציה להתאמת הגודל בהתאם לספירה
      color: (word, weight) => colors[Math.floor(Math.random() * colors.length)], // בחירת צבע רנדומלי מהמערך
      rotateRatio: 0.5, // יחס הסיבוב של המילים
      rotationSteps: 2, // שלבי הסיבוב (0 או 90 מעלות)
      backgroundColor: "002f34", // צבע הרקע של הענן מילים
      drawOutOfBound: false, // מניעת ציור מחוץ לתחום האלמנט
    });
  }, [responses]); // useEffect יפעל מחדש כל פעם שהתגובות ישתנו
  return (
      <div ref={wordCloudRef} style={{ width: '50vw', height: '50vh' }}></div>
  )
}






// --dark-primary-color: #002f34;
// --primary-color: #007072;
// --light-primary-color: #83e1d1;
// --text-color: #90e702;
// --button-color: #07161b;
