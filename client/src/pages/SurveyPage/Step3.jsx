import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSurveyStore } from '../../store';
import style from './style.module.scss';
import SubmitButton from '../../components/SubmitButton';
import { socket } from '../../socket';

export default function Step3() {
  const navigate = useNavigate();
  const servey = useSurveyStore((state) => state.servey);
  const setServey = useSurveyStore((state) => state.setServey);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServey(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('newResponse', servey);
    console.log(servey);
  };

  return (
    <div className={style.survey_page}>
      <img className={style.logo} src='/logo2.png' alt='logo' />
      <div className={style.container}>
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
        <div className={style.buttons}>
          <div className={style.submit} onClick={handleSubmit}><SubmitButton /></div>
          <button onClick={() => navigate('/survey/step2b')}>
          הקודם
            <img className={style.back} src='/angle.png' alt='arrow' />
          </button>
        </div>
      </div>
    </div>
  );
}
