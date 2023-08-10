import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { TaskPage } from './TaskPage/TaskPage';
import { MicCheck } from './MicCheck/MicCheck';
import { PausePage } from './PausePage/PausePage';
import { AudioRecorderPage } from './AudioRecorderPage/AudioRecorderPage';
import { AudioPage } from './AudioPage';
import { QuestionPage } from './QuestionPage';
import { EndedPage } from './EndedPage';
import { TestPage } from './StartTest';
import { PauseBefore } from './PausePage/PauseBefore';
import { NextPage } from './NaxtPage';
import { PeepPage } from './PeepPage';

export const StepNavigator = memo(() => {
    const locCur = useSelector((state: RootState) => state.audio.locationCurrent);
    switch (locCur) {
        case '/micro/': {
            return <TaskPage/>
        }
        case '/micro/pause': {
            return <PausePage/>
        }
        case '/micro/pause-before': {
            return <PauseBefore/>
        }
        case '/micro/mic-check': {
            return <MicCheck/>
        }
        case '/micro/peep': {
            return <PeepPage/>
        }
        case '/micro/recorder': {
            return <AudioRecorderPage/>
        }
        case '/micro/audio': {
            return <AudioPage/>
        }
        case '/micro/next': {
            return <NextPage/>
        }
        case '/micro/question': {
            return <QuestionPage/>
        }
        case '/micro/ended': {
            return <EndedPage/>
        }
        case '/micro/test': {
            return <TestPage/>
        }
        default: {
            return <TaskPage/>
        }
    }
})

StepNavigator.displayName = 'StepNavigator'