import React, { ReactNode } from 'react';
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
import { useGetTaskQuery } from './store/services/api';

const router = createBrowserRouter([
    {
        path: '/',
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
export const ACTIVE_TASK = 'ACTIVE_TASK'

function App() {
    // Пример ссылки http://localhost:3006?taskID=1
    const { taskID } = useParams()
    localStorage.setItem(ACTIVE_TASK, taskID ?? '')
    const { data, error, isLoading } = useGetTaskQuery(taskID ?? '');
    let content: ReactNode;
    if (isLoading) {
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
        content = (<RouterProvider router={router}/>);
    }
    return (
        <div className="main-container container">
            <div className="head-content">
                <div className="audio-icon"></div>
                <h1 className="audio-head">Онлайн тестирование</h1>
            </div>
            {content}
        </div>
    );
}

export default App;
