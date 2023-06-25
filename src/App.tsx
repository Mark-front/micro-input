import React from 'react';
import cls from './App.module.css';
import { CountdownTimer } from './components/CountdownTimer/CountdownTimer';
import { CountupTimer } from './components/CountupTimer/CountupTimer';
import { AudioRecorder } from './components/AudioRecoder/AudioRecorder';

function App() {


    return (
        <div className={cls.App}>
            <header className="">
                <CountdownTimer/>
                <CountupTimer/>
                <AudioRecorder/>
            </header>
        </div>
    );
}

export default App;
