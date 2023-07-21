import React, { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setLocationCurrent } from '../../store/slices/audioDataSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface IMicCheckProps {
    className?: string;
}

export const MicCheck = memo((props: IMicCheckProps) => {
    
    const dispatch = useDispatch()

    const locationCurrent = useSelector((state: RootState) => state.audio.locationCurrent);
    const locationStart = useSelector((state: RootState) => state.audio.locationStart);

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
                            dispatch(setLocationCurrent('/micro/pause'))
                        }}
                    >
                        Начать проверку
                    </button>
                </div>
            </div>
        </div>
    );
})

MicCheck.displayName = 'MicCheck'