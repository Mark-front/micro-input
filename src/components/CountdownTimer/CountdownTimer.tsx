import React, { memo, useCallback, useState } from 'react';
import Timer from '../Timer/Timer';
import { ONE_SECOND_IN_MILLISECONDS } from '../../config/globalVal';


interface CountdownTimerProps {
    className?: string;
    time: number;
    isPlay: boolean;
    onEnd?: () => void
    onStart?: () => void
    isLoading?: boolean
}

/**
 Время задается в секундах
 */
export const CountdownTimer = memo((props: CountdownTimerProps) => {
    const {
        className = '',
        time,
        isPlay = false,
        onEnd,
        onStart,
        isLoading,
    } = props;
    
    const [ play, setPlay ] = useState(isPlay);
    const [ currentTime, setCurrentTime ] = useState(time * 1000); // значение в милисекундах
    
    const handlePlay = useCallback(() => {
        onStart?.()
        setPlay(true)
    }, [ onStart ]);
    
    const handleStop = useCallback(() => {
        setPlay(false)
    }, []);
    
    const handleEnd = useCallback(() => {
        setPlay(false)
        onEnd?.()
    }, [ onEnd ]);
    
    const handleStep = useCallback(() => {
        setCurrentTime(currentTime - ONE_SECOND_IN_MILLISECONDS)
    }, [ currentTime ]);
    
    return (
        <div className={className}>
            <Timer
                time={currentTime}
                isPlay={play}
                onStep={handleStep}
                onPlay={handlePlay}
                onStop={handleStop}
                onEnd={handleEnd}
            />
        </div>
    );
})

CountdownTimer.displayName = 'CountdownTimer'