import React, { memo, useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
// eslint-disable-next-line max-len
import { setLocationCurrent } from '../store/slices/audioDataSlice';

interface IPeepPageProps {
    className?: string;
}

export const PeepPage = memo((props: IPeepPageProps) => {
    const {
        className = '',
    } = props;
    
    const dispatch = useDispatch()
    const audio = useRef<HTMLAudioElement>(null);
    const onEnded = useCallback(() => {
        dispatch(setLocationCurrent('/micro/recorder'))
    }, [ dispatch ]);
    
    useEffect(() => {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i
            .test(navigator.userAgent)) {
            // @ts-ignore`
            audio.current.volume = 1;
        } else {
            // @ts-ignore`
            audio.current.volume = 0.25;
        }
    }, [])
    return (
        <div className="main-content-wrap">
            { /*@ts-ignore*/}
            <audio ref={audio} style={{ display: 'none' }} src={window.settingsForMicro.audioPeep} onEnded={onEnded}
                autoPlay={true}/>
        </div>
    );
});

PeepPage.displayName = 'PeepPage';