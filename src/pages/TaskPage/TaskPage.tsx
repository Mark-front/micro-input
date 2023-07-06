import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { handleEndedTask } from '../../store/slices/audioDataSlice';

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
    ] = useState(false);

    const [
        error,
        setError,
    ] = useState(false);

    const handleAudioDevice = () => {
        navigator.mediaDevices.getUserMedia({ audio: true }).then(() => {
            setMicroAvailable(true)
            if (microAvailable && !isChecked) {
                navigate('/mic-check')
            }
        }).catch((e) => {
            setError(true)
            console.error(e);
        })
    }

    const isChecked = useSelector((state: RootState) => state.audio.isChecked)
    const isEnded = useSelector(handleEndedTask)

    useEffect(() => {
        if (microAvailable && !isChecked) {
            navigate('/mic-check')
        }
        if (isEnded) {
            navigate('/ended')
        }
        if (isChecked) {
            navigate('/question')
        }
    }, [ isChecked, isEnded, microAvailable, navigate ]);
    return (
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
    );
})


TaskPage.displayName = 'MainPage'