import React, { memo, useCallback, useState } from 'react';
import Timer from '../Timer/Timer';
import { ONE_SECOND_IN_MILLISECONDS } from '../../config/globalVal';

interface CountupTimerProps {
    className?: string;
}

export const CountupTimer = memo((props: CountupTimerProps) => {
    const {
        className = '',
    } = props;

    const [ play, setPlay ] = useState(false);
    const [ currentTime, setCurrentTime ] = useState(120000); // значение в милисекундах

    const handlePlay = useCallback(() => {
        setPlay(true)
    }, []);

    const handleStop = useCallback(() => {
        setPlay(false)
    }, []);


    const handleEnd = useCallback(() => {
        setPlay(false)
        alert('Конец времени')
    }, []);

    const handleStep = useCallback(() => {
        setCurrentTime(currentTime + ONE_SECOND_IN_MILLISECONDS)
    }, [ currentTime ]);

    return (
        <div>
            <button onClick={handlePlay}>start</button>
            <Timer
                time={currentTime}
                isPlay={play}
                onStep={handleStep}
                onPlay={handlePlay}
                onStop={handleStop}
                onEnd={handleEnd}
            />
            <button onClick={handleStop}>stop</button>
        </div>
    );
})

CountupTimer.displayName = 'CountupTimer'