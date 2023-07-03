import React, { memo, SyntheticEvent, useCallback, useEffect, useRef, useState } from 'react';

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
                {/*Кнопка для запуска аудио нужна из-за https://developer.chrome.com/blog/autoplay/*/}
                <button onClick={playAudio} className='play-btn'>Play</button>
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
                    src="http://d2cstorage-a.akamaihd.net/wbr/gotnext/8578.mp3"
                    type="audio/mp3"
                />
            </audio>
        </>
    );
})

Audio.displayName = 'Audio'