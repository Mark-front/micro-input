import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AudioState {
    value: string
    isCheck: boolean
    currentStep: number
    allStep: number
}

const initialState: AudioState = {
    value: '',
    isCheck: false,
    currentStep: 0,
    allStep: Infinity,

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
    },

})

// Action creators are generated for each case reducer function
export const { saveAudio } = audioSlice.actions

export const handleEndedTask = (state: AudioState) => state.currentStep >= state.allStep

export default audioSlice.reducer