import { createSlice } from '@reduxjs/toolkit'
import { Step, Task } from '../types';
import { RootState } from '../store';

export interface AudioState {
    value: string[]
    isChecked: boolean
    currentStepNumber: number
    allStepNumber: number
    task?: Task
    currentStep?: Step
}

const initialState: AudioState = {
    value: [],
    isChecked: false,
    currentStepNumber: 0,
    allStepNumber: Infinity,
    task: undefined,
    currentStep: undefined,

}

export const audioSlice = createSlice({
    name: 'audio',
    initialState,
    reducers: {
        saveAudio: (state, action) => {
            state.value = [ ...state.value, action.payload ]
        },
        toggleCheck: state => {
            state.isChecked = true
        },
        setTask: (state, action) => {
            state.task = action.payload
        },
        setCurrentStep: (state, action) => {
            state.currentStep = { ...action.payload }
        },
        setCurrentStepNumber: state => {
            state.currentStepNumber += 1
        },
    },
})

// Action creators are generated for each case reducer function
export const { saveAudio } = audioSlice.actions
export const { setTask } = audioSlice.actions
export const { setCurrentStep } = audioSlice.actions
export const { setCurrentStepNumber } = audioSlice.actions
export const { toggleCheck } = audioSlice.actions

export const handleEndedTask = (state: RootState) => state.audio.currentStepNumber >= state.audio.allStepNumber
export const getCurrentStep = (state: RootState) => state.audio.currentStep
export const getCurrentStepNumber = (state: RootState) => state.audio.currentStepNumber
export default audioSlice.reducer