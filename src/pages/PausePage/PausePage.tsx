import React, { memo } from 'react';
import { CountdownTimer } from '../../components/CountdownTimer/CountdownTimer';
import { useNavigate } from 'react-router-dom';
import { getCurrentStep } from '../../store/slices/audioDataSlice';
import { useSelector } from 'react-redux';

interface ICountDownPageProps {
    className?: string;
}

export const PausePage = memo((props: ICountDownPageProps) => {
    const {
        className = '',
    } = props;

    const navigate = useNavigate();

    const currentStep = useSelector(getCurrentStep)

    return (
        <div className="main-content-wrap">
            <div className="container vertikal">
                <div className="main-content__text">
                    <div className="audio-text">Приготовьтесь</div>
                    <div className="countdown">
                        <CountdownTimer time={currentStep?.pause ?? 5} isPlay onEnd={() => navigate('/recorder')}/>
                    </div>
                </div>
            </div>
        </div>
    );
})

PausePage.displayName = 'CountDownPage'