import React, { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setLocationCurrent } from '../store/slices/audioDataSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface ITestPageProps {
    className?: string;
}

export const TestPage = memo((props: ITestPageProps) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const locationCurrent = useSelector((state: RootState) => state.audio.locationCurrent);
    const locationStart = useSelector((state: RootState) => state.audio.locationStart);

    useEffect(() => {
        if (!String(location.href).includes(locationCurrent)) {
            location.href = locationStart
        }
    }, [ locationCurrent, locationStart ]);

    return (
        <div className="main-content-wrap">
            <div className="container vertikal">
                <div className="main-content__text">
                    <div className="audio-text">Давайте проверим работу вашего микрофона, прослушайте текст, затем
                        повторите его.
                    </div>
                    <button
                        className="audio-button button-blue"
                        onClick={() => {
                            dispatch(setLocationCurrent('/question'))
                            navigate('/question')
                        }}
                    >
                        Начать тест
                    </button>
                </div>
            </div>
        </div>
    );
})

TestPage.displayName = 'TestPage'