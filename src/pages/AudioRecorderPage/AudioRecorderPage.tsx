import React, { memo } from 'react';
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
    
    const textQuestion = useSelector((state: RootState) => state.audio.currentStep?.question.text)
    const loading = useSelector((state: RootState) => state.audio.isAudioSendLoading)
    
    
    const dispatch = useDispatch()
    
    return (
        <div className="main-content-wrap">
            <div className="container vertikal">
                <div className="main-content__text">
                    {textQuestion}
                    <AudioRecorder
                        getAudio={(audioFile) => dispatch(saveAudio(audioFile))}
                    />
                    {loading ? <div className="audio-text">Идет сохранение ответа в файл...</div> :
                        <div className="audio-text">Идёт запись ответа</div>}
                </div>
            </div>
        </div>
    );
})

AudioRecorderPage.displayName = 'AudioRecorderPage'