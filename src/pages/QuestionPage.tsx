import React, { memo, useCallback } from 'react';
import { Audio } from '../components/Audio';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setLocationCurrent, toggleCheck } from '../store/slices/audioDataSlice';

interface IQuestionPageProps {
    className?: string;
}

export const QuestionPage = memo((props: IQuestionPageProps) => {
    const {
        className = '',
    } = props;
    
    
    const dispatch = useDispatch()
    
    const isChecked = useSelector((state: RootState) => state.audio.isChecked)
    const text = useSelector((state: RootState) => state.audio.currentStep?.question.text_task)
    const audio = useSelector((state: RootState) =>
        isChecked ?
            state.audio.currentStep?.question.audio :
            state.audio.test_question.audio
    )
    
    const onEnded = useCallback(() => {
        dispatch(setLocationCurrent('/micro/peep'))
    }, [ dispatch ]);
    
    return (
        <div className="main-content-wrap">
            <div className="audio-text">{
                // @ts-ignore
                isChecked ? (text ?? 'Текст задания:') : window.settingsForMicro.testQuestionText
            }</div>
            {
                (audio) ?
                    <Audio srcAudio={audio} onEnded={onEnded}/>
                    :
                    <button
                        className="audio-button button-blue"
                        onClick={() => {
                            dispatch(toggleCheck())
                            dispatch(setLocationCurrent('/micro/peep'))
                        }}
                    >
                        Ответить
                    </button>
            }
        </div>
    );
});

QuestionPage.displayName = 'QuestionPage';