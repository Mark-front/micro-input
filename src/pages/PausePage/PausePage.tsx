import React, { memo } from 'react';
import { CountdownTimer } from '../../components/CountdownTimer/CountdownTimer';
import { useNavigate } from 'react-router-dom';
import { ACTIVE_STEP } from '../../App';
import { useGetStepQuery } from '../../store/services/api';

interface ICountDownPageProps {
    className?: string;
}

export const PausePage = memo((props: ICountDownPageProps) => {
    const {
        className = '',
    } = props;

    const navigate = useNavigate();

    const stepId = localStorage.getItem(ACTIVE_STEP)
    const { data, isError, isLoading } = useGetStepQuery(stepId);
    if (isLoading) {
        return <>...</>
    } else {
        console.log(data)
    }

    if (isError) {
        return <>Ошибка</>
    }
    return (
        <>

            <div className="main-content-wrap">
                <div className="container vertikal">
                    <div className="main-content__text">
                        <div className="audio-text">Приготовьтесь</div>
                        <div className="countdown">
                            <CountdownTimer time={data?.pause ?? 15} isPlay onEnd={() => navigate('/recorder')}/>
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