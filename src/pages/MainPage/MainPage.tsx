import React, { memo, ReactNode, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetStepQuery, useGetTaskQuery } from '../../store/services/api';
import { ACTIVE_STEP, ACTIVE_TASK } from '../../App';
import { addQueryParams } from '../../lib/url/addQueryParams/addQueryParams';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface IMainPageProps {
    className?: string;
}

export const MainPage = memo((props: IMainPageProps) => {
    const {
        className = '',
    } = props;

    const [
        microAvailable,
        setMicroAvailable,
    ] = useState(JSON.parse(localStorage.getItem('MICRO_AVAILABLE') ?? 'false'));

    const [
        error,
        setError,
    ] = useState(false);

    const handleAudioDevice = () => {
        navigator.mediaDevices.getUserMedia({ audio: true }).then(() => {
            localStorage.setItem('MICRO_AVAILABLE', 'true')
            setMicroAvailable(true)
            if (microAvailable && !isCheck) {
                navigate('/mic-check')
            }
        }).catch((e) => {
            setError(true)
            console.error(e);
        })
    }

    const navigate = useNavigate();

    const { id } = useParams();

    const task = useGetTaskQuery(id);
    const step = useGetStepQuery(task.data?.stepsId[0]);

    const isCheck = useSelector((state: RootState) => state.audio.isCheck)


    let content: ReactNode;
    if (task.isLoading && step.isLoading) {
        content = (
            <div className="main-container container">
                <div className="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        );
    } else {
        localStorage.setItem(ACTIVE_TASK, task.data?.id ?? '');
        localStorage.setItem(ACTIVE_STEP, step.data?.id ?? '');
        content = (<>
            <div className="main-content-wrap">
                <div className="container vertikal">
                    <div className="main-content__text">
                        <div className="audio-text">
                            {error
                                ? 'Микрофон не найден'
                                // eslint-disable-next-line max-len
                                : 'В этом тесте вам будет необходимо отвечать на вопросы. Для прохождения теста нам нужен доступ к вашему микрофону.'}
                        </div>
                        <button
                            className="audio-button button-blue"
                            onClick={handleAudioDevice}
                        >
                            Запросить доступ
                        </button>
                    </div>
                </div>
            </div>
        </>);
    }

    if (task.isError || step.isError) {
        content = (<div className="main-container container">
            При загрузке данных произошла ошибка
        </div>);
    }

    if (content) return content
})

MainPage.displayName = 'MainPage'