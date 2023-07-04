import React, { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
            navigate('/mic-check')
        }).catch((e) => {
            setError(true)
            console.error(e);
        })
    }

    const navigate = useNavigate();

    useEffect(() => {
        if (microAvailable) {
            navigate('/mic-check')
        }
    }, [ microAvailable, navigate ]);

    return (
        <>
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
        </>
    );
})

MainPage.displayName = 'MainPage'