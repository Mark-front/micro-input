import React, { memo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Audio } from '../components/Audio';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setLocationCurrent } from '../store/slices/audioDataSlice';

interface IQuestionPageProps {
    className?: string;
}

export const QuestionPage = memo((props: IQuestionPageProps) => {
    const {
        className = '',
    } = props;

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const audio = useSelector((state: RootState) => state.audio.currentStep?.question.audio)
    const text = useSelector((state: RootState) => state.audio.currentStep?.question.text)

    const onEnded = useCallback(() => {
        console.log('end')
        dispatch(setLocationCurrent('/pause'))
        navigate('/pause')
    }, [ dispatch, navigate ]);

    const locationCurrent = useSelector((state: RootState) => state.audio.locationCurrent);
    const locationStart = useSelector((state: RootState) => state.audio.locationStart);


    console.log(locationCurrent, '/question', 'locationCurrent')
    useEffect(() => {
        if (!String(location.href).includes(locationCurrent)) {
            location.href = locationStart
        }
    }, [ locationCurrent, locationStart ]);

    return (
        <div className="main-content-wrap">
            <div className="audio-text">{text ?? 'Вопрос:'}</div>
            {
                (audio) &&
                <Audio srcAudio={audio} onEnded={onEnded}/>
            }
        </div>
    );
});

QuestionPage.displayName = 'QuestionPage';