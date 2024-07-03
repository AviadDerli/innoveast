import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSurveyStore } from '../../store';
import style from './style.module.scss';

export default function Step1() {
    const navigate = useNavigate();
    const servey = useSurveyStore((state) => state.servey);
    const setServey = useSurveyStore((state) => state.setServey);
    const [noName, setNoName] = useState(false);
    const [noPhone, setNoPhone] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setServey(name, value);
        if (name === 'name' && value !== '') {
            setNoName(false);
        }
        if (name === 'phone' && value !== '') {
            setNoPhone(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (servey.name === '' || servey.phone === '') {
            if (servey.name === '') {
                setNoName(true);
            }
            if (servey.phone === '') {
                setNoPhone(true);
            }
        } else {
            navigate('/survey/step2');
        }
    };

    return (
        <div dir='rtl' className={style.survey_page}>
            <img className={style.logo} src='/logo2.png' alt='logo' />
            
            <div className={style.container}>
            <h1>שאלון היכרות</h1>

                <div className={style.form_group}>
                    <label>
                        אז איך קוראים לך?
                        <input type="text" name="name" value={servey.name} onChange={handleChange} required />
                        {noName && <span className={style.error}>אנא הכנס שם</span>}
                    </label>
                </div>
                <div className={style.form_group}>
                    <label>
                        מספר הטלפון שלך?
                        <input type="tel" name="phone" value={servey.phone} onChange={handleChange} required />
                        {noPhone && <span className={style.error}>אנא הכנס מספר טלפון</span>}
                    </label>
                </div>
                <div className={style.buttons}>
                    <button onClick={handleSubmit}>
                        הבא
                        <img className={style.next} src='/angle.png' alt='next' />
                    </button>
                </div>
            </div>
        </div>
    );
}
