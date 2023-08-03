import React, { ReactNode, useEffect } from 'react';
import './styles/App.module.css';
import './styles/style.css';
import './styles/media.css';
import './styles/audio.css';
import { createBrowserRouter } from 'react-router-dom';
import { MicCheck } from './pages/MicCheck/MicCheck';
import { AudioRecorderPage } from './pages/AudioRecorderPage/AudioRecorderPage';
import { AudioPage } from './pages/AudioPage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';
import { useGetTaskQuery } from './store/services/api';
import { TaskPage } from './pages/TaskPage/TaskPage';
import { setAllStepNumber, setCurrentStep, setTasks, setTestQuestion } from './store/slices/audioDataSlice';
import { QuestionPage } from './pages/QuestionPage';
import { EndedPage } from './pages/EndedPage';
import { TestPage } from './pages/StartTest';
import { PausePage } from './pages/PausePage/PausePage';
import { StepNavigator } from './pages/StepNavigator';

const router = createBrowserRouter([
    {
        path: '/micro/',
        element: <TaskPage/>,
    },
    {
        path: '/micro/pause',
        element: <PausePage/>,
    },
    {
        path: '/micro/mic-check',
        element: <MicCheck/>,
    },
    {
        path: '/micro/recorder',
        element: <AudioRecorderPage/>,
    },
    {
        path: '/micro/audio',
        element: <AudioPage/>,
    },
    {
        path: '/micro/question',
        element: <QuestionPage/>,
    },
    {
        path: '/micro/ended',
        element: <EndedPage/>,
    }, {
        path: '/micro/test',
        element: <TestPage/>,
    },
]);

function App() {
    // пример http://localhost:3006/?taskID=1
    const { data, isError, isLoading, isSuccess } = useGetTaskQuery('0');
    const isChecked = useSelector((state: RootState) => state.audio.isChecked)
    const currentStepNumber = useSelector((state: RootState) => state.audio.currentStepNumber);
    const task = useSelector((state: RootState) => state.audio.tasks?.[Number(0)]);
    const dispatch = useDispatch()
    // @ts-ignore
    const audioImg = window.settingsForMicro.audioImg
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
            <StepNavigator/>
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
            dispatch(setTestQuestion(data!.test_question))
            dispatch(setCurrentStep(task?.steps[currentStepNumber]))
            dispatch(setAllStepNumber((task?.steps.length ?? Infinity) - 1))
        }
    }, [ currentStepNumber, data, dispatch, isChecked, isSuccess, task ]);
    
    const style = {
        content: `url(${audioImg})`,
    }
    
    // @ts-ignore
    const fetchRequest = async (props) => {
        const {
            // @ts-ignore
            data, path,
        } = props;
        
        const formData = new FormData();
        
        for (const key in data) {
            // @ts-ignore
            formData.append(key, data[key]);
        }
        
        // @ts-ignore
        const res = await fetch(path, {
            method: 'post',
            headers: {
                'Content-type': 'multipart/form-data',
            },
            body: formData,
        })
            .then((response) => response.json())
            .catch((error) => {
                console.log(error)
            });
        
        return res
    }
    
    // @ts-ignore
    const sendFeedback = async (ev) => {
        ev.preventDefault()
        const res = await fetchRequest({
            data: {
                fileNames: JSON.stringify([
                    'micro/upload/sadfqwe12341234123-1.mp3',
                    'micro/upload/sadfqwe12341234123-2.mp3',
                    'micro/upload/sadfqwe12341234123-3.mp3' ]),
                // @ts-ignore
                studentID: window.settingsForMicro.userId,
            },
            // @ts-ignore
            path: window.settingsForMicro.formAjaxPath,
        })
        console.log(res)
    }
    
    
    return (
        <div className="main-container container">
            <div className="head-content">
                <div className="audio-icon" style={style}></div>
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
            
            <form
                encType='multipart/form-data'
                method='post' name="audio_send"
                onSubmit={sendFeedback}>
                <input name="audio" type="hidden" value="ok"/>
                <button type="submit" className="audio-button button-red">Отправить результат</button>
            </form>
        </div>
    );
}

export default App;
