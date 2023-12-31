import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Clock } from './ui/Clock/Clock';
import { ONE_SECOND_IN_MILLISECONDS } from '../../config/globalVal';

interface TimerProps {
    time: number;
    isPlay: boolean;
    onStep: () => void;
    onStop?: () => void;
    onPlay?: () => void;
    onEnd?: () => void;
    timeStep?: number;
    className?: string;

}

const Timer = memo((props: TimerProps) => {
    const {
        onStop,
        onEnd,
        time,
        onPlay,
        onStep,
        timeStep = ONE_SECOND_IN_MILLISECONDS,
        isPlay,
        className,
    } = props

    const playInterval = useRef<ReturnType<typeof setInterval>>()

    const [ isStart, setIsStart ] = useState(false);
    const stopTimer = useCallback(() => {
        onStop?.()
        clearInterval(playInterval.current)
    }, [ onStop ]);

    useEffect(() => {
        if (!isPlay) {
            stopTimer()
            return
        }

        if (!isStart) {
            onPlay?.()
            setIsStart(true)
        }

        playInterval.current = setTimeout(() => {
            onStep()
        }, timeStep)

        if (time <= 0) {
            onEnd?.()
        }

        return () => clearTimeout(playInterval.current)

    }, [ stopTimer, time, onEnd, isPlay, onStep, timeStep, isStart, onPlay ]);

    return (
        <Clock time={time}/>
    )
})

Timer.displayName = 'Timer'
export default Timer