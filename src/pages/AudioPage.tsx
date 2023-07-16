import React, { memo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Audio } from '../components/Audio';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
// eslint-disable-next-line max-len
import { deleteCheckAudio, getCurrentStepNumber, setLocationCurrent, toggleCheck } from '../store/slices/audioDataSlice';

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
    const timeForAnswer = useSelector((state: RootState) => state.audio.currentStep?.timeForAnswer)


    const dispatch = useDispatch()

    const onEnded = useCallback(() => {
        if (!isChecked) {
            dispatch(toggleCheck())
            dispatch(deleteCheckAudio())
            dispatch(setLocationCurrent('/test'))
            navigate('/test')
            return
        }
        dispatch(setLocationCurrent('/'))
        navigate('/')
    }, [ dispatch, isChecked, navigate ]);


    const locationCurrent = useSelector((state: RootState) => state.audio.locationCurrent);
    const locationStart = useSelector((state: RootState) => state.audio.locationStart);


    console.log(locationCurrent, '/audio', 'locationCurrent')
    useEffect(() => {
        if (!String(location.href).includes(locationCurrent)) {
            location.href = locationStart
        }
    }, [ locationCurrent, locationStart ]);

    return (
        <div className="main-content-wrap">
            <Audio srcAudio={audio[number]} onEnded={onEnded} time={timeForAnswer}/>
            {!isChecked && <button className="audio-button button-blue center"
                onClick={() => {
                    dispatch(setLocationCurrent('/pause'))
                    navigate('/pause')
                }}>
                Проверить еще раз
            </button>}
        </div>
    );
});

AudioPage.displayName = 'AudioPage';