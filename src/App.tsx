import React from 'react';
import './styles/App.module.css'
import './styles/style.css'
import './styles/media.css'
import './styles/audio.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainPage } from './pages/MainPage/MainPage';
import { MicCheck } from './pages/MicCheck/MicCheck';
import { AudioRecorderPage } from './pages/AudioRecorderPage/AudioRecorderPage';
import { PausePage } from './pages/PausePage/PausePage';
import { AudioPage } from './pages/AudioPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainPage/>,
    },
    {
        path: '/pause',
        // eslint-disable-next-line react/jsx-no-undef
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


function App() {
    return (
        <div className="main-container container">
            <div className="head-content">
                <div className="audio-icon"></div>
                <h1 className="audio-head">Онлайн тестирование</h1>
            </div>
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;
