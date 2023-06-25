import React, { memo, useCallback, useEffect, useRef } from 'react';
import cls from './Clock.module.css';
import { classNames } from '../../../../lib/classNames/classNames';
import { ONE_HOUR_IN_MINUTES, ONE_MINUTE_IN_SECONDS, ONE_SECOND_IN_MILLISECONDS } from '../../../../config/globalVal';

interface ClockProps {
    className?: string;
    time: number;
}

interface Time {
    sec: number
    min: number
    hour: number
}

export const Clock = memo((props: ClockProps) => {
    const {
        className = '',
        time,
    } = props;

    const calcTimeFormat = useCallback((time: number): Time => {
        const timeInSec = time / ONE_SECOND_IN_MILLISECONDS
        const timeInMin = timeInSec / ONE_MINUTE_IN_SECONDS;
        const timeInHour = timeInMin / ONE_HOUR_IN_MINUTES

        const hour = Math.floor(timeInHour);
        const min = Math.floor(timeInMin - hour * ONE_HOUR_IN_MINUTES);
        const sec = Math.floor(timeInSec - min * ONE_MINUTE_IN_SECONDS);

        return {
            sec: sec,
            min: min,
            hour: hour,
        }
    }, [])

    const currentTime = useRef(calcTimeFormat(time));

    useEffect(() => {
        currentTime.current = calcTimeFormat(time)
    }, [ calcTimeFormat, time ]);

    const {
        hour,
        min,
        sec,
    } = currentTime.current;

    return (
        <time className={classNames(cls.Clock, {}, [ className ])}>
            {hour} : {min} : {sec}
        </time>
    );
})

Clock.displayName = 'Clock'