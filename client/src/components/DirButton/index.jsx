import React from 'react'
import style from './style.module.scss'

export default function DirButton({ dir, onClick }) {
    return (
        <button className={dir === 'back' ? style.back : style.next} onClick={onClick}>
            {dir === 'back' && 'הקודם'}
            <img src='/angle.png' alt={dir} />
            {dir === 'next' && 'הבא'}
            </button>
    )
}
