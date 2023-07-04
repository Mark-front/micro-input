import React, { memo, useState } from 'react';
import { AudioRecorder } from '../../components/AudioRecoder/AudioRecorder';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { saveAudio } from '../../store/slices/audioDataSlice';

interface IAudioRecorderPageProps {
    className?: string;
}

export const AudioRecorderPage = memo((props: IAudioRecorderPageProps) => {
    const {
        className = '',
    } = props;

    const dispatch = useDispatch()

    return (
        <>
            <div className="main-content-wrap">
                <div className="container vertikal">
                    <div className="main-content__text">
                        <AudioRecorder getAudio={(audioFile) => dispatch(saveAudio(audioFile))}/>
                        <div className="audio-text">идёт запись ответа</div>
                    </div>
                </div>
            </div>
            <div className="bottom-text">
                <div className="proverka">Задание 1 из 6</div>
            </div>
        </>
    );
})

AudioRecorderPage.displayName = 'AudioRecorderPage'