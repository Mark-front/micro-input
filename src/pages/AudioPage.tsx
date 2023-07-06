import React, { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Audio } from '../components/Audio';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { getCurrentStepNumber, setCurrentStepNumber, toggleCheck } from '../store/slices/audioDataSlice';

interface IAudioPageProps {
    className?: string;
}

export const AudioPage = memo((props: IAudioPageProps) => {
    const {
        className = '',
    } = props;

    const navigate = useNavigate();
    const audio = useSelector((state: RootState) => state.audio.value);
    const number = useSelector(getCurrentStepNumber);
    const isChecked = useSelector((state: RootState) => state.audio.isChecked)

    const dispatch = useDispatch()

    const onEnded = useCallback(() => {
        if (!isChecked) {
            dispatch(toggleCheck())
            dispatch(setCurrentStepNumber())
        }
        navigate('/')
    }, [ dispatch, isChecked, navigate ]);
    

    return (
        <>
            <div className="main-content-wrap">
                <Audio srcAudio={audio[number]} onEnded={onEnded}/>
            </div>
        </>
    );
});

AudioPage.displayName = 'AudioPage';