import { create } from 'zustand';
import { socket } from './socket';

export const useSurveyStore = create((set, get) => ({
  servey: {
    name: '',
    phone: '',
    lecture: false,
    advice: false,
    investor: false,
    teenagers: false,
    startup: false,
    founder: false,
    entrepreneur: false,
    networking: false,
    contentEvents: false,
    recruiting: false,
    resume: false,
    nextJob: false,
    firstJob: false,
    collaboration: false,
    promoteTechArea: false,
    promoteWomenTech: false,
    location: '',
    workplace: '',
    jobTitle: '',
    experience: '',
    linkedin: '',
    facebook: '',
    additionalInfo: '',
  },
  setServey: (name, value) => set((state) => ({
    servey: {
      ...state.servey,
      [name]: value,
    },
  })),
  responses:0,
  allResponses: [],
  setResponses: (responses) => set({ responses }),
  addResponse: (response) => {
    console.log(response)
    socket.emit('newResponse', response)
  },
  updateResponses:()=>{
    socket.on('updateResponses', (data) => {
      console.log("updateResponses, ", data)
      const setResponses = get().setResponses
      setResponses(data)
    })
  }
}))
