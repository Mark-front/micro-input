import React, { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Audio } from '../components/Audio';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { ACTIVE_TASK } from '../App';
import { handleEndedTask } from '../store/slices/audioDataSlice';

interface IAudioPageProps {
    className?: string;
}

export const AudioPage = memo((props: IAudioPageProps) => {
    const {
        className = '',
    } = props;

    const navigate = useNavigate();
    const audio = useSelector((state: RootState) => state.audio.value);
    const taskNumber = localStorage.getItem(ACTIVE_TASK)

    const isEndedTask = useSelector(handleEndedTask)
    const onEnded = useCallback(() => {
        navigate(`/task/${taskNumber}`)
    }, [ navigate, taskNumber ]);
    return (
        <>
            <div className="main-content-wrap">
                <Audio srcAudio={audio} onEnded={onEnded}/>
            </div>
        </>
    );
});

AudioPage.displayName = 'AudioPage';