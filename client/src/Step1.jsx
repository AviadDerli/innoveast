import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSurveyStore } from '../../store';
import style from './style.module.scss';

export default function Step1() {
  const navigate = useNavigate();
  const servey = useSurveyStore((state) => state.servey);
  const setServey = useSurveyStore((state) => state.setServey);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServey(name, value);
  };

  return (
    <div className={style.step}>
      <h2>שלב 1: פרטים אישיים</h2>
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
      <button onClick={() => navigate('/survey/step2')}>הבא</button>
    </div>
  );
}
