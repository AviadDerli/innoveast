import React, { useEffect } from 'react'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import Home from './pages/Home'
import { useSurveyStore } from './store'
import Step1 from './pages/SurveyPage/Step1'
import Step2 from './pages/SurveyPage/Step2'
import Step3 from './pages/SurveyPage/Step3'
import Step2b from './pages/SurveyPage/Step2b'
import SlideFrom from './pages/Slide_from'
import SlideWorks from './pages/Slide_works'
import SlideVotes from './pages/Slide_votes'
import ThanksPage from './pages/ThanksPage'

export default function App() {


  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/survey/step1", element: <Step1 /> },
    { path: "/survey/step2", element: <Step2 /> },
    { path: "/survey/step2b", element: <Step2b /> },
    { path: "/survey/step3", element: <Step3 /> },
    { path: "/thanks", element: <ThanksPage /> },
    { path: "/from", element: <SlideFrom /> },
    { path: "/jobs", element: <SlideWorks /> },
    { path: "/votes", element: <SlideVotes /> }
  ])

  const updateResponses = useSurveyStore(state => state.updateResponses);

  useEffect(() => {
    updateResponses();
  }, [updateResponses]);

  return (
    <div>
      <RouterProvider router={router} />
      <img src="/credit.png" className="credit" alt="c" />
    </div>
  )
}
