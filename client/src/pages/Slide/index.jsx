import { useEffect, useState } from 'react'
import style from './style.module.scss'
import Jobes from '../../components/Jobes';
import BarChart from '../../components/BarChart';
import Location from '../../components/Location';
import { useSurveyStore } from '../../store';
import QRCode from 'react-qr-code';

export default function Slide() {
    const [slide, setSlide] = useState("votes");
    const responses = useSurveyStore((state) => state.responses);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (slide === "from") {
                setSlide("jobs");
            } else if (slide === "jobs") {
                setSlide("votes");
            } else if (slide === "votes") {
                setSlide("from");
            }
        }, 30000);
        // ניקוי ה-timer במקרה שהקומפוננטה יוצאת מה-DOM
        return () => clearTimeout(timer);
    }, [slide]);

    return (
        <div className={style.container}>
            <div className={style.header}>
                <h1>כיף שבאתם, נשמח להכיר אתכם קצת יותר</h1>
                <p>עד עכשיו מילאו את שאלון ההיכרות שלנו:
                    <span className={style.responses}> {responses.length}</span>
                    משתתפים!
                </p>
                <p>רוצים למלא גם? סרקו את הברקוד</p>
                <h2>
                    {slide === "from" ? "לפי מה שעניתם אתם גרים ב:" : slide === "jobs" ? "לפי מה שעניתם אתם עובדים ב:" : "הכי חשוב לכם שנעשה יחד:"}
                </h2>
            </div>
            <div className={style.main}>
                <div className={style.logoContainer}>
                    <img className={style.logo} src='logo2.png' alt='pen' />
                </div>
                <div className={style.content}>
                    {slide === "from" ? <Location /> :
                        slide === "jobs" ? <Jobes /> :
                            <BarChart />}
                </div>
                <div className={style.qr}>
                    <div className={style.qrCodeContainer}>
                        <QRCode
                            size={256}
                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                            value={"https://survey.vaccines.gov.il/survey"}
                            viewBox={`0 0 256 256`}
                            className={style.qrCode}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
