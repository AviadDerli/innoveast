import React, { useEffect, useRef } from 'react';
import { socket } from '../../socket';
import style from './style.module.scss';
import SubmitButton from '../../components/SubmitButton';
import { useSurveyStore } from '../../store';

export default function SurveyPage() {
  const servey = useSurveyStore((state) => state.servey);
  const setServey = useSurveyStore((state) => state.setServey);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(name, value, type, checked);
    if (type === 'checkbox') {
      setServey(name, checked);
    } else {
      setServey(name, value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('newResponse', servey);
    console.log(servey);
  };

  const scribbleRef = useRef(null);
 const penRef = useRef(null);

  // useEffect(() => {
  //   const movePen = (e) => {
  //     if (penRef.current) {
  //       const penRect = penRef.current.getBoundingClientRect();
  //       const penCenterX = penRect.width / 2;
  //       const penCenterY = penRect.height / 2;
  //       penRef.current.style.left = `${e.clientX - penCenterX}px`;
  //       penRef.current.style.top = `${e.clientY - penCenterY}px`;
  //     }
  //   };

  //   window.addEventListener('mousemove', movePen);
  //   return () => window.removeEventListener('mousemove', movePen);
  // }, []);


  return (
    <div dir='rtl' className={style.survey_page}>
      <h1>שאלון היכרות</h1>
      {/* <Scribble ref={scribbleRef} /> */}
      <img ref={penRef} className={style.pen} src='pen.png' alt='pen'/>
      <img className={style.logo} src='logo2.png' alt='pen'/>
      <form onSubmit={handleSubmit}>
        <div className={style.form_group}>
          <label>
            אז איך קוראים לך?
            <input type="text" name="name" value={servey.name} onChange={handleChange} required />
          </label>
        </div>
        <div className={style.form_group}>
          <label>
            מספר הטלפון שלך?
            <input type="tel" name="phone" value={servey.phone} onChange={handleChange} required />
          </label>
        </div>

        <div className={style.checkbox_list}>
          <div className={style.checkbox}>
            <input type="checkbox" id="lecture" name="lecture" checked={servey.lecture} onChange={handleChange} />
            <label htmlFor="lecture">אשמח לשתף מהידע שלי ולהעביר הרצאה ליזמים והייטקיסטים</label>
          </div>
          <div className={style.checkbox}>
            <input type="checkbox" id="advice" name="advice" checked={servey.advice} onChange={handleChange} />
            <label htmlFor="advice">אני רוצה לייעץ לסטארטאפים</label>
          </div>
          <div className={style.checkbox}>
            <input type="checkbox" id="investor" name="investor" checked={servey.investor} onChange={handleChange} />
            <label htmlFor="investor">אני משקיע/ה ורוצה להצטרף למועדון האנג'לים</label>
          </div>
          <div className={style.checkbox}>
            <input type="checkbox" id="teenagers" name="teenagers" checked={servey.teenagers} onChange={handleChange} />
            <label htmlFor="teenagers">אני רוצה להיפגש עם בני נוער ולחשוף אותם לעולמות ההייטק</label>
          </div>
          <div className={style.checkbox}>
            <input type="checkbox" id="startup" name="startup" checked={servey.startup} onChange={handleChange} />
            <label htmlFor="startup">מדגדג לי להקים או להצטרף לסטארטאפ</label>
          </div>
          <div className={style.checkbox}>
            <input type="checkbox" id="founder" name="founder" checked={servey.founder} onChange={handleChange} />
            <label htmlFor="founder">אני פאונדר/ית בסטארטאפ</label>
          </div>
          <div className={style.checkbox}>
            <input type="checkbox" id="entrepreneur" name="entrepreneur" checked={servey.entrepreneur} onChange={handleChange} />
            <label htmlFor="entrepreneur">אני יזם או יזמת בנשמה</label>
          </div>
          <div className={style.checkbox}>
            <input type="checkbox" id="networking" name="networking" checked={servey.networking} onChange={handleChange} />
            <label htmlFor="networking">אשמח להכיר את האנשים הנכונים להתייעץ איתם באתגרים מקצועיים</label>
          </div>
          <div className={style.checkbox}>
            <input type="checkbox" id="contentEvents" name="contentEvents" checked={servey.contentEvents} onChange={handleChange} />
            <label htmlFor="contentEvents">מעניין אותי התוכן והאירועים שהקהילה יכולה להציע</label>
          </div>
          <div className={style.checkbox}>
            <input type="checkbox" id="recruiting" name="recruiting" checked={servey.recruiting} onChange={handleChange} />
            <label htmlFor="recruiting">אני מגייס עובדים ועובדות ואני רוצה להביא את האנשים הכי טובים</label>
          </div>
          <div className={style.checkbox}>
            <input type="checkbox" id="resume" name="resume" checked={servey.resume} onChange={handleChange} />
            <label htmlFor="resume">רוצה להעביר קורות חיים רלוונטיים למשרות בחברה שלי</label>
          </div>
          <div className={style.checkbox}>
            <input type="checkbox" id="nextJob" name="nextJob" checked={servey.nextJob} onChange={handleChange} />
            <label htmlFor="nextJob">בחיפוש אחר התפקיד הבא שלי</label>
          </div>
          <div className={style.checkbox}>
            <input type="checkbox" id="firstJob" name="firstJob" checked={servey.firstJob} onChange={handleChange} />
            <label htmlFor="firstJob">בחיפוש עבודה ראשונה בהייטק</label>
          </div>
          <div className={style.checkbox}>
            <input type="checkbox" id="collaboration" name="collaboration" checked={servey.collaboration} onChange={handleChange} />
            <label htmlFor="collaboration">יש לי רעיון לשיתוף פעולה עסקי עם אינוביסט</label>
          </div>
          <div className={style.checkbox}>
            <input type="checkbox" id="promoteTechArea" name="promoteTechArea" checked={servey.promoteTechArea} onChange={handleChange} />
            <label htmlFor="promoteTechArea">חשוב לי לקדם הייטק באזור</label>
          </div>
          <div className={style.checkbox}>
            <input type="checkbox" id="promoteWomenTech" name="promoteWomenTech" checked={servey.promoteWomenTech} onChange={handleChange} />
            <label htmlFor="promoteWomenTech">חשוב לי לקדם נשים בהייטק</label>
          </div>
        </div>

        <div className={style.form_group}>
          <label>
            מגורים
            <input type="text" name="location" value={servey.location} onChange={handleChange} />
          </label>
        </div>
        <div className={style.form_group}>
          <label>
            מקום עבודה
            <input type="text" name="workplace" value={servey.workplace} onChange={handleChange} />
          </label>
        </div>
        <div className={style.form_group}>
          <label>
            באיזה תפקיד?
            <input type="text" name="jobTitle" value={servey.jobTitle} onChange={handleChange} />
          </label>
        </div>
        <div className={style.form_group}>
          <label>
            שנות ניסיון בתעשיה
            <input type="number" name="experience" value={servey.experience} onChange={handleChange} />
          </label>
        </div>
        <div className={style.form_group}>
          <label>
            נשמח להתחבר בלינקדאין
            <input type="text" name="linkedin" value={servey.linkedin} onChange={handleChange} />
          </label>
        </div>
        <div className={style.form_group}>
          <label>
            נשמח להתחבר בפייסבוק
            <input type="text" name="facebook" value={servey.facebook} onChange={handleChange} />
          </label>
        </div>
        <div className={style.form_group}>
          <label>
            משהו נוסף שיש לך לספר לנו
            <textarea name="additionalInfo" value={servey.additionalInfo} onChange={handleChange}></textarea>
          </label>
        </div>
        <div className={style.submit} type='submit'  onSubmit={handleSubmit}><SubmitButton /></div>
      </form>
    </div>
  );
}
