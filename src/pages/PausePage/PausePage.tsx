import React, { memo } from 'react';
import { CountdownTimer } from '../../components/CountdownTimer/CountdownTimer';
import { getCurrentStep, setLocationCurrent } from '../../store/slices/audioDataSlice';
import { useDispatch, useSelector } from 'react-redux';

interface ICountDownPageProps {
    className?: string;
}

export const PausePage = memo((props: ICountDownPageProps) => {
    const {
        className = '',
    } = props;
    
    
    const currentStep = useSelector(getCurrentStep)
    const dispatch = useDispatch()
    
    return (
        <div className="main-content-wrap">
            <div className="container vertikal">
                <div className="main-content__text">
                    <div className="audio-text">Приготовьтесь к ответу</div>
                    <div className="countdown">
                        <CountdownTimer time={currentStep?.pause ?? 6} isPlay onEnd={() => {
                            dispatch(setLocationCurrent('/micro/recorder'))
                        }}/>
                    </div>
                </div>
            </div>
        </div>
    
    );
})

PausePage.displayName = 'CountDownPage'