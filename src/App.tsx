import React, { ReactNode } from 'react';
import './styles/App.module.css';
import './styles/style.css';
import './styles/media.css';
import './styles/audio.css';
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';
import { MicCheck } from './pages/MicCheck/MicCheck';
import { AudioRecorderPage } from './pages/AudioRecorderPage/AudioRecorderPage';
import { PausePage } from './pages/PausePage/PausePage';
import { AudioPage } from './pages/AudioPage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';
import { useGetTaskQuery } from './store/services/api';
import { TaskPage } from './pages/TaskPage/TaskPage';
import { setTask } from './store/slices/audioDataSlice';

const router = createBrowserRouter([
    {
        path: '/task',
        element: <TaskPage/>,
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

function App() {
    // пример http://localhost:3006/?taskID=task1
    const id = new URLSearchParams(location.search).get('taskID')
    const { data, isError, isLoading, isSuccess } = useGetTaskQuery(id);

    const isCheck = useSelector((state: RootState) => state.audio.isCheck)
    const currentStep = useSelector((state: RootState) => state.audio.currentStep);
    const allStep = useSelector((state: RootState) => state.audio.allStep);
    const task = useSelector((state: RootState) => state.audio.task);

    const dispatch = useDispatch()
    const navigate = useNavigate()

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
    }

    if (isError && !task) {
        content = (<div className="main-container container">
            При загрузке данных произошла ошибка
        </div>);
    }

    if (isSuccess || task) {
        dispatch(setTask(data))
        navigate('/task')
        content = (
            <RouterProvider router={router}/>
        );
    }

    return (
        <div className="main-container container">
            <div className="head-content">
                <div className="audio-icon"></div>
                <h1 className="audio-head">Онлайн тестирование</h1>
            </div>
            {content}
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
