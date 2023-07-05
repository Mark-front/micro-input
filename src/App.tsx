import React, { ReactNode, useEffect } from 'react';
import './styles/App.module.css';
import './styles/style.css';
import './styles/media.css';
import './styles/audio.css';
import { createBrowserRouter, RouterProvider, useParams } from 'react-router-dom';
import { MainPage } from './pages/MainPage/MainPage';
import { MicCheck } from './pages/MicCheck/MicCheck';
import { AudioRecorderPage } from './pages/AudioRecorderPage/AudioRecorderPage';
import { PausePage } from './pages/PausePage/PausePage';
import { AudioPage } from './pages/AudioPage';
import { useGetStepQuery, useGetTaskQuery } from './store/services/api';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';

const router = createBrowserRouter([
    {
        path: '/task/:id',
        element: <MainPage/>,
    },
    {
        path: '/pause',
        element: <PausePage/>,
    },
    {
        path: '/mic-check',
        element: <MicCheck/>,
    },
    {
        path: '/recorder',
        element: <AudioRecorderPage/>,
    },
    {
        path: '/audio',
        element: <AudioPage/>,
    },
]);
export const ACTIVE_TASK = 'ACTIVE_TASK';
export const ACTIVE_STEP = 'ACTIVE_STEP';

function App() {
    const isCheck = useSelector((state: RootState) => state.audio.isCheck)
    const currentStep = useSelector((state: RootState) => state.audio.currentStep);
    const allStep = useSelector((state: RootState) => state.audio.allStep);

    return (
        <div className="main-container container">
            <div className="head-content">
                <div className="audio-icon"></div>
                <h1 className="audio-head">Онлайн тестирование</h1>
            </div>
            <RouterProvider router={router}/>
            <div className="bottom-text">
                <div className="proverka">
                    {
                        !isCheck
                            ?
                            'Проверка оборудования'
                            :
                            `Задание ${currentStep} из ${allStep}`
                    }
                </div>
            </div>
        </div>
    );
}

export default App;
