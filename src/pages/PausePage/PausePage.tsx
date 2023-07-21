import React, { memo, useEffect } from 'react';
import { CountdownTimer } from '../../components/CountdownTimer/CountdownTimer';
import { useNavigate } from 'react-router-dom';
import { getCurrentStep, setLocationCurrent } from '../../store/slices/audioDataSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface ICountDownPageProps {
    className?: string;
}

export const PausePage = memo((props: ICountDownPageProps) => {
    const {
        className = '',
    } = props;

    

    const currentStep = useSelector(getCurrentStep)
    const dispatch = useDispatch()

    const locationCurrent = useSelector((state: RootState) => state.audio.locationCurrent);
    const locationStart = useSelector((state: RootState) => state.audio.locationStart);
    return (
        <div className="main-content-wrap">
            <div className="container vertikal">
                <div className="main-content__text">
                    <div className="audio-text">Приготовьтесь</div>
                    <div className="countdown">
                        <CountdownTimer time={currentStep?.pause ?? 5} isPlay onEnd={() => {
                            dispatch(setLocationCurrent('/micro/recorder'))
                        }}/>
                    </div>
                </div>
            </div>
        </div>

    );
})

PausePage.displayName = 'CountDownPage'