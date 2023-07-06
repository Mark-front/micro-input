import React, { memo } from 'react';
import { CountdownTimer } from '../../components/CountdownTimer/CountdownTimer';
import { useNavigate } from 'react-router-dom';

interface ICountDownPageProps {
    className?: string;
}

export const PausePage = memo((props: ICountDownPageProps) => {
    const {
        className = '',
    } = props;

    const navigate = useNavigate();
    return (
        <>

            <div className="main-content-wrap">
                <div className="container vertikal">
                    <div className="main-content__text">
                        <div className="audio-text">Приготовьтесь</div>
                        <div className="countdown">
                            <CountdownTimer time={15} isPlay onEnd={() => navigate('/recorder')}/>
                        </div>
                    </div>
                </div>
            </div>


            <div className="bottom-text">
                <div className="proverka">Проверка оборудования</div>
            </div>
        </>
    );
})

PausePage.displayName = 'CountDownPage'