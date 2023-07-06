import { createSlice } from '@reduxjs/toolkit'
import { Task } from '../types';

export interface AudioState {
    value: string
    isCheck: boolean
    currentStep: number
    allStep: number
    task?: Task
}

const initialState: AudioState = {
    value: '',
    isCheck: false,
    currentStep: 0,
    allStep: Infinity,
    task: undefined,
}

export const audioSlice = createSlice({
    name: 'audio',
    initialState,
    reducers: {
        saveAudio: (state, action) => {
            state.value = action.payload
        },
        toggleCheck: (state) => {
            state.isCheck = !state.isCheck
        },
        setTask: (state, action) => {
            state.task = action.payload
        },
    },

})

// Action creators are generated for each case reducer function
export const { saveAudio } = audioSlice.actions
export const { setTask } = audioSlice.actions

export const handleEndedTask = (state: AudioState) => state.currentStep >= state.allStep

export default audioSlice.reducer