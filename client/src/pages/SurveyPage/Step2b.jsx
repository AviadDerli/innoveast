import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSurveyStore } from '../../store';
import style from './style.module.scss';
import PageProgress from '../../components/SubmitButton/PageProgress';
import DirButton from '../../components/DirButton'

export default function Step2b() {
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
            <PageProgress targetProgress={75} />

      <img className={style.logo} src='/logo2.png' alt='logo' />
      <div className={style.container}>
        <div className={style.checkbox_list}>
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
        <DirButton dir='next' onClick={() => navigate('/survey/step3')} />
        <DirButton dir='back' onClick={() => navigate('/survey/step2')} />
      </div>
    </div>
  );
}
