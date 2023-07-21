import React, { memo, useEffect } from 'react';
import { AudioRecorder } from '../../components/AudioRecoder/AudioRecorder';
import { useDispatch, useSelector } from 'react-redux';
import { saveAudio } from '../../store/slices/audioDataSlice';
import { RootState } from '../../store/store';

interface IAudioRecorderPageProps {
    className?: string;
}

export const AudioRecorderPage = memo((props: IAudioRecorderPageProps) => {
    const {
        className = '',
    } = props;
    const isLoadedPage = useSelector((state: RootState) => state.audio.isLoadedPage);

    const dispatch = useDispatch()

    const locationCurrent = useSelector((state: RootState) => state.audio.locationCurrent);
    const locationStart = useSelector((state: RootState) => state.audio.locationStart);

    return (
        <div className="main-content-wrap">
            <div className="container vertikal">
                <div className="main-content__text">
                    <AudioRecorder
                        getAudio={(audioFile) => dispatch(saveAudio(audioFile))}
                    />
                    <div className="audio-text">идёт запись ответа</div>
                </div>
            </div>
        </div>
    );
})

AudioRecorderPage.displayName = 'AudioRecorderPage'