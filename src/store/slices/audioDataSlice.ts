import { createSlice } from '@reduxjs/toolkit'
import { Step, Task } from '../types';
import { RootState } from '../store';

export interface AudioState {
    value: (string | undefined)[]
    isChecked: boolean
    currentStepNumber: number
    allStepNumber: number
    tasks?: Task[]
    currentStep?: Step
    isLoadedPage: boolean
    locationStart: string
    locationCurrent: string
}

const initialState: AudioState = {
    value: [],
    isChecked: false,
    currentStepNumber: 0,
    allStepNumber: Infinity,
    tasks: undefined,
    currentStep: undefined,
    isLoadedPage: false,
    locationStart: '/',
    locationCurrent: '/',
}

export const audioSlice = createSlice({
    name: 'audio',
    initialState,
    reducers: {
        saveAudio: (state, action) => {
            state.value = [ ...state.value, action.payload ]
        },
        deleteCheckAudio: (state) => {
            const currenArray: (string | undefined)[] = state.value.filter((item, indx) => {
                return indx !== 0
            });

            state.value = [ ...currenArray ]
        },
        toggleCheck: state => {
            state.isChecked = true
        },
        setTasks: (state, action) => {
            state.tasks = [ ...action.payload ]
        },
        setCurrentStep: (state, action) => {
            state.currentStep = { ...action.payload }
        },
        setAllStepNumber: (state, action) => {
            state.allStepNumber = action.payload
        },
        setCurrentStepNumber: state => {
            state.currentStepNumber += 1
        },
        setIsLoadedPage: (state, action) => {
            state.isLoadedPage = action.payload
        },
        setLocationStart: (state, action) => {
            state.locationStart = action.payload
        },
        setLocationCurrent: (state, action) => {
            state.locationCurrent = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { saveAudio } = audioSlice.actions
export const { setTasks } = audioSlice.actions
export const { setCurrentStep } = audioSlice.actions
export const { setCurrentStepNumber } = audioSlice.actions
export const { setAllStepNumber } = audioSlice.actions
export const { toggleCheck } = audioSlice.actions
export const { deleteCheckAudio } = audioSlice.actions
export const { setIsLoadedPage } = audioSlice.actions
export const { setLocationStart } = audioSlice.actions
export const { setLocationCurrent } = audioSlice.actions

export const handleEndedTask = (state: RootState) => state.audio.currentStepNumber >= state.audio.allStepNumber
export const getCurrentStep = (state: RootState) => state.audio.currentStep
export const getCurrentStepNumber = (state: RootState) => state.audio.currentStepNumber
export default audioSlice.reducer