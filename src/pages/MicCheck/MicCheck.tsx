import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';

interface IMicCheckProps {
    className?: string;
}

export const MicCheck = memo((props: IMicCheckProps) => {
    const navigate = useNavigate();
    return (
        <>
            <div className="main-content-wrap">
                <div className="container vertikal">
                    <div className="main-content__text">
                        <div className="audio-text">Давайте проверим работу вашего микрофона, прослушайте текст, затем
                            повторите его.
                        </div>
                        <button
                            className="audio-button button-blue"
                            onClick={() => navigate('/recorder')}
                        >
                            Проверка
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
})

MicCheck.displayName = 'MicCheck'