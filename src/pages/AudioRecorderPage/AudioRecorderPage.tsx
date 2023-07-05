import React, { memo, useState } from 'react';
import { AudioRecorder } from '../../components/AudioRecoder/AudioRecorder';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { saveAudio } from '../../store/slices/audioDataSlice';
import { useGetStepQuery, useGetTaskQuery, usePostAnswerMutation } from '../../store/services/api';
import { ACTIVE_STEP, ACTIVE_TASK } from '../../App';

interface IAudioRecorderPageProps {
    className?: string;
}

export const AudioRecorderPage = memo((props: IAudioRecorderPageProps) => {
    const {
        className = '',
    } = props;

    const dispatch = useDispatch()

    const taskId = localStorage.getItem(ACTIVE_TASK) ?? undefined

    const { data, isLoading } = useGetStepQuery('1')
    const [ postAnswer ] = usePostAnswerMutation()

    if (isLoading) {
        return (<div>...</div>)
    }

    return (
        <>
            <div className="main-content-wrap">
                <div className="container vertikal">
                    <div className="main-content__text">
                        <AudioRecorder
                            getAudio={(audioFile) => dispatch(saveAudio(audioFile))}
                            postAnswer={
                                (audioFile) =>
                                    postAnswer({ stepId: data?.id, taskId: taskId,  audio: audioFile })}
                            step={data}
                        />
                        <div className="audio-text">идёт запись ответа</div>
                    </div>
                </div>
            </div>
        </>
    );
})

AudioRecorderPage.displayName = 'AudioRecorderPage'