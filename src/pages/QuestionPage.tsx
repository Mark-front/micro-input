import React, { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Audio } from '../components/Audio';
import { useSelector } from 'react-redux';
import { getCurrentStep } from '../store/slices/audioDataSlice';
import { RootState } from '../store/store';

interface IQuestionPageProps {
    className?: string;
}

export const QuestionPage = memo((props: IQuestionPageProps) => {
    const {
        className = '',
    } = props;

    const navigate = useNavigate();
    const currentStep = useSelector(getCurrentStep)

    const audio = useSelector((state: RootState) => state.audio.currentStep?.question.audio)
    const text = useSelector((state: RootState) => state.audio.currentStep?.question.text)

    const onEnded = useCallback(() => {
        console.log('end')
    }, []);

    return (
        <div className="main-content-wrap">
            <div className="audio-text">{text ?? 'Вопрос:'}</div>
            {
                (audio) &&
                <Audio srcAudio={audio} onEnded={onEnded}/>
            }

            <button
                className='audio-button button-blue center'
                onClick={() => navigate('/pause')}
            >
                Ответить
            </button>
        </div>
    );
});

QuestionPage.displayName = 'QuestionPage';