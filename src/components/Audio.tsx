import React, { memo, SyntheticEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useGetTaskQuery } from '../store/services/api';

interface IAudioProps {
    className?: string;
    srcAudio: string;
}

export const Audio = memo((props: IAudioProps) => {
    const {
        className = '',
        srcAudio,
    } = props;


    const handlePlay = useCallback((e: SyntheticEvent<HTMLAudioElement>) => {
        console.log(e)
    }, [])

    const handleLoad = useCallback((e: SyntheticEvent<HTMLAudioElement>) => {
        console.log(e)
    }, [])

    const audio = useRef<HTMLAudioElement>(null);

    const [ duration, setDuration ] = useState(0);
    const [ currentTime, setCurrentTime ] = useState(0);
    const [ progressPresent, setProgressPresent ] = useState(0);

    const playAudio = useCallback(() => {
        audio.current?.play()
    }, []);

    const timeUpdate = useCallback(() => {
        console.log(audio.current?.currentTime, audio.current?.duration)
        setCurrentTime(Math.floor(audio.current?.currentTime ?? 0))
        setProgressPresent(currentTime / duration * 100)
    }, [ currentTime, duration ]);

    useEffect(() => {
        audio.current?.addEventListener('loadeddata', () => {
            if (audio.current?.duration) {
                setDuration(Math.floor(audio.current?.duration))
                setCurrentTime(Math.floor(audio.current?.currentTime))
            }
        })
    }, []);

    return (
        <>
            <div className="audio-text">Текст соотв экрана</div>
            <div className="play-progress">
                {/* Кнопка для запуска аудио нужна из-за https://developer.chrome.com/blog/autoplay/ */}
                <button onClick={playAudio} className='play-btn'>
                    <svg
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 210 210" xmlSpace="preserve"
                    >
                        <path d="M179.07,105L30.93,210V0L179.07,105z"/>
                    </svg>
                </button>
                <div className="progress-bar">
                    <div className="progress-bar-start">{currentTime}</div>
                    <div className="progress-bar-end">{duration}</div>
                    <div className="progress-bar-inner" style={{ width: `${progressPresent}%` }}></div>
                </div>
            </div>
            <audio
                ref={audio}
                autoPlay={true}
                preload={'auto'}
                onPlay={handlePlay}
                onTimeUpdate={timeUpdate}
                onEnded={timeUpdate}
            >
                <source
                    src={srcAudio} // test audio http://d2cstorage-a.akamaihd.net/wbr/gotnext/8578.mp3
                    type="audio/mp3"
                />
            </audio>
        </>
    );
})

Audio.displayName = 'Audio'