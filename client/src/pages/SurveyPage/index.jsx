import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/Header'
import style from './style.module.scss'

export default function SurveyPage() {
  return (
    <div className={style.survey_page}>
      <Header/>
      <Outlet />

    </div>
  )
}
