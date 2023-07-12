import React, { ReactNode, useEffect } from 'react';
import './styles/App.module.css';
import './styles/style.css';
import './styles/media.css';
import './styles/audio.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MicCheck } from './pages/MicCheck/MicCheck';
import { AudioRecorderPage } from './pages/AudioRecorderPage/AudioRecorderPage';
import { PausePage } from './pages/PausePage/PausePage';
import { AudioPage } from './pages/AudioPage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';
import { useGetTaskQuery } from './store/services/api';
import { TaskPage } from './pages/TaskPage/TaskPage';
import { setAllStepNumber, setCurrentStep, setLocationStart, setTasks } from './store/slices/audioDataSlice';
import { QuestionPage } from './pages/QuestionPage';
import { EndedPage } from './pages/EndedPage';
import { createBrowserHistory } from 'history';

const router = createBrowserRouter([
    {
        path: '/',
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
    {
        path: '/question',
        element: <QuestionPage/>,
    },
    {
        path: '/ended',
        element: <EndedPage/>,
    },
]);

function App() {
    // пример http://localhost:3006/?taskID=1
    const id: string = new URLSearchParams(location.search).get('taskID') || ''
    const { data, isError, isLoading, isSuccess } = useGetTaskQuery(id);
    const isChecked = useSelector((state: RootState) => state.audio.isChecked)
    const currentStepNumber = useSelector((state: RootState) => state.audio.currentStepNumber);
    const task = useSelector((state: RootState) => state.audio.tasks?.[Number(id)]);
    const isLoaded = useSelector((state: RootState) => state.audio.isLoadedPage);
    const locationStart = useSelector((state: RootState) => state.audio.locationStart);
    const dispatch = useDispatch()

    const history = createBrowserHistory();

    useEffect(() => {
        if (String(location.href).includes('taskID')) {
            sessionStorage.setItem('startHref', location.href)
            dispatch(setLocationStart(location.href))
        }
    }, [ dispatch, history, id, isLoaded, locationStart ]);

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
    if (isSuccess || task) {
        content = (
            <RouterProvider router={router}/>
        );
    }

    if (isError) {
        content = (<div className="main-container container">
            При загрузке данных произошла ошибка
        </div>);
    }


    useEffect(() => {
        if (isSuccess) {
            dispatch(setTasks(data!.tasks))
            dispatch(setCurrentStep(task?.steps[currentStepNumber]))
            dispatch(setAllStepNumber((task?.steps.length ?? Infinity) - 1))
        }
    }, [ currentStepNumber, data, dispatch, isChecked, isSuccess, task ]);
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
                        !isChecked
                            ?
                            'Проверка оборудования'
                            :
                            `Задание ${currentStepNumber + 1} из ${task?.steps.length}`
                    }
                </div>
            </div>
        </div>
    );
}

export default App;
