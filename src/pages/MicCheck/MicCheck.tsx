import React, { memo } from 'react';
import { setLocationCurrent } from '../../store/slices/audioDataSlice';
import { useDispatch } from 'react-redux';

interface IMicCheckProps {
    className?: string;
}

export const MicCheck = memo((props: IMicCheckProps) => {
    
    const dispatch = useDispatch()
    
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
                            dispatch(setLocationCurrent('/micro/pause-before'))
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