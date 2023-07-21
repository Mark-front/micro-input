import React, { memo, useCallback } from 'react';
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

    
    const audio = useSelector((state: RootState) => state.audio.value);
    const number = useSelector(getCurrentStepNumber);
    const isChecked = useSelector((state: RootState) => state.audio.isChecked)
    const timeForAnswer = useSelector((state: RootState) => state.audio.currentStep?.timeForAnswer)


    const dispatch = useDispatch()

    const onEnded = useCallback(() => {
        if (!isChecked) {
            dispatch(toggleCheck())
            dispatch(deleteCheckAudio())
            dispatch(setLocationCurrent('/micro/test'))
            return
        }
        dispatch(setLocationCurrent('/'))
    }, [ dispatch, isChecked ]);


    const locationCurrent = useSelector((state: RootState) => state.audio.locationCurrent);
    const locationStart = useSelector((state: RootState) => state.audio.locationStart);


    console.log(locationCurrent, '/micro/audio', 'locationCurrent')

    return (
        <div className="main-content-wrap">
            <Audio srcAudio={audio[number]} onEnded={onEnded} time={timeForAnswer}/>
            {!isChecked && (
                <>
                    <button className="audio-button button-blue center mb-5"
                        onClick={() => {
                            dispatch(setLocationCurrent('/micro/pause'))
                        }}>
                        Проверить еще раз
                    </button>
                    <button
                        className="audio-button button-blue"
                        onClick={() => {
                            dispatch(setLocationCurrent('/micro/question'))
                        }}
                    >
                        Начать тест
                    </button>
                </>)
            }
        </div>
    );
});

AudioPage.displayName = 'AudioPage';