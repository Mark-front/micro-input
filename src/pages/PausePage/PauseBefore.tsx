import React, { memo } from 'react';
import { CountdownTimer } from '../../components/CountdownTimer/CountdownTimer';
import { getCurrentStep, setLocationCurrent } from '../../store/slices/audioDataSlice';
import { useDispatch, useSelector } from 'react-redux';

interface ICountDownPageProps {
    className?: string;
}

export const PauseBefore = memo((props: ICountDownPageProps) => {
    const {
        className = '',
    } = props;
    
    
    const currentStep = useSelector(getCurrentStep)
    const dispatch = useDispatch()
    
    console.log(currentStep)
    
    return (
        <div className="main-content-wrap">
            <div className="container vertikal">
                <div className="main-content__text">
                    <div className="audio-text">Приготовьтесь</div>
                    <div className="countdown">
                        <CountdownTimer time={currentStep?.question_pause ?? 5} isPlay onEnd={() => {
                            dispatch(setLocationCurrent('/micro/question'))
                        }}/>
                    </div>
                </div>
            </div>
        </div>
    
    );
})

PauseBefore.displayName = 'CountDownPage'