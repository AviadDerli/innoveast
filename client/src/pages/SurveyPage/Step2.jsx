import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSurveyStore } from '../../store';
import style from './style.module.scss';
import PageProgress from '../../components/SubmitButton/PageProgress';

export default function Step2() {
  const navigate = useNavigate();
  const servey = useSurveyStore((state) => state.servey);
  const setServey = useSurveyStore((state) => state.setServey);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setServey(name, checked);
    } else {
      setServey(name, value);
    }
  };

  return (
    <div className={style.survey_page}>
      <PageProgress targetProgress={50} />

      <img className={style.logo} src='/logo2.png' alt='logo' />
      <div className={style.container}>
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
        </div>
        <div className={style.buttons}>
          <button onClick={() => navigate('/survey/step2b')}>
            <img className={style.next} src='/angle.png' alt='next' />
            הבא
          </button>
          <button onClick={() => navigate('/survey/step1')}>
            הקודם
            <img className={style.back} src='/angle.png' alt='next' />
          </button>
        </div>
      </div>
    </div>
  );
}
