import React, { memo, ReactNode, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';

interface IMainPageProps {
    className?: string;
}

export const TaskPage = memo((props: IMainPageProps) => {
    const {
        className = '',
    } = props;
    const navigate = useNavigate();
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
            setMicroAvailable(true)
            if (microAvailable && !isCheck) {
                navigate('/mic-check')
            }
        }).catch((e) => {
            setError(true)
            console.error(e);
        })
    }

    const isCheck = useSelector((state: RootState) => state.audio.isCheck)


    const content: ReactNode = (<>
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

    if (content) return content
})


TaskPage.displayName = 'MainPage'