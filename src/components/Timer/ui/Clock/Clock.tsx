import React, { memo, useCallback } from 'react';
import cls from './Clock.module.css';
import { classNames } from '../../../../lib/classNames/classNames';
import { ONE_SECOND_IN_MILLISECONDS } from '../../../../config/globalVal';

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

    const calcTimeFormat = useCallback((time: number) => {
        const timeInSec = time / ONE_SECOND_IN_MILLISECONDS
        const sec = Math.floor(timeInSec);

        return sec
    }, [])

    const sec = calcTimeFormat(time);

    return (
        <time className={classNames(cls.Clock, {}, [ className ])}>
            {sec}
        </time>
    );
})

Clock.displayName = 'Clock'