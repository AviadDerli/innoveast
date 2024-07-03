import { useState } from "react";
import style from './style.module.scss'

export default function SubmitButton() {
    const [active, setActive] = useState(false);

    const handleClick = () => {
        setActive(true);
    };

    return (
        <button type="button" className={active ? style.active : style.button} onClick={handleClick}>
            <p>{active ? "Thanks" : "Submit"}</p>
            <div className={style.check_box}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                    <path fill="transparent" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                </svg>
            </div>
        </button>
    );
}