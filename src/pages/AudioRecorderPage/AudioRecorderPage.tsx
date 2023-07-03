import React, { memo, useState } from 'react';
import { AudioRecorder } from '../../components/AudioRecoder/AudioRecorder';

interface IAudioRecorderPageProps {
    className?: string;
}

export const AudioRecorderPage = memo((props: IAudioRecorderPageProps) => {
    const {
        className = '',
    } = props;
    const [ audioSrc, setAudioSrc ] = useState<string>();
    return (
        <>
            <div className="main-content-wrap">
                <div className="container vertikal">
                    <div className="main-content__text">
                        <AudioRecorder getAudio={setAudioSrc}/>
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