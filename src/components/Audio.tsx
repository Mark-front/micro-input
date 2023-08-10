import React, { memo, SyntheticEvent, useCallback, useEffect, useRef, useState } from 'react';

interface IAudioProps {
    className?: string;
    srcAudio?: string;
    onEnded?: () => void;
    time?: number;
}

export const Audio = memo((props: IAudioProps) => {
    const {
        className = '',
        srcAudio,
        onEnded,
        time,
    } = props;
    
    
    const [ isPlay, setIsPlay ] = useState(false);
    const handlePlay = useCallback((e: SyntheticEvent<HTMLAudioElement>) => {
        console.log(e);
    }, []);
    
    const audio = useRef<HTMLAudioElement>(null);
    
    const [ duration, setDuration ] = useState(0);
    const [ isReady, setIsReady ] = useState(false);
    const [ currentTime, setCurrentTime ] = useState(0);
    const [ progressPresent, setProgressPresent ] = useState(0);
    
    const playAudio = useCallback(() => {
        if (isReady) {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i
                .test(navigator.userAgent)) {
                // @ts-ignore
                audio.current.volume = 1;
            } else {
                // @ts-ignore
                audio.current.volume = 0.25;
            }
            audio.current?.play();
            console.log('play')
        } else {
            audio.current?.load();
            setIsReady(true);
        }
        
    }, [ isReady ]);
    
    const timeUpdate = useCallback(() => {
        if (!time) {
            setCurrentTime(Math.floor(Number(audio.current?.currentTime) ?? 0));
            setDuration(Math.floor(Number(audio.current?.duration) - 1 ?? 0));
            setProgressPresent(currentTime / duration * 100);
        } else {
            setCurrentTime(Math.floor(Number(audio.current?.currentTime) ?? 0));
            setDuration(Math.floor(time) - 1);
            setProgressPresent(currentTime / duration * 100);
        }
    }, [ currentTime, duration, time ]);
    
    useEffect(() => {
        audio.current?.addEventListener('loadeddata', () => {
            if (audio.current?.duration && audio.current?.duration !== Infinity) {
                setDuration(Math.floor(audio.current?.duration) - 1);
                setCurrentTime(Math.floor(Number(audio.current?.currentTime)));
                
            }
        });
        audio.current?.addEventListener('play', () => {
            setIsPlay(true);
        });
    }, [ isPlay, isReady, playAudio ]);
    
    return (
        <>
            <div className="play-progress">
                {/* Кнопка для запуска аудио нужна из-за https://developer.chrome.com/blog/autoplay/ */}
                {<button onClick={playAudio} className='play-btn'>
                    <svg
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 210 210" xmlSpace="preserve"
                    >
                        <path d="M179.07,105L30.93,210V0L179.07,105z"/>
                    </svg>
                </button>}
                <div className="progress-bar">
                    <div className="progress-bar-start">{currentTime}</div>
                    <div className="progress-bar-end">{duration}</div>
                    <div className="progress-bar-inner" style={{ width: `${progressPresent}%` }}></div>
                </div>
            </div>
            <audio
                ref={audio}
                preload={'auto'}
                onPlay={handlePlay}
                onCanPlay={playAudio}
                onTimeUpdate={timeUpdate}
                onEnded={timeUpdate}
                onLoadedDataCapture={timeUpdate}
                onLoadedMetadata={timeUpdate}
                onEndedCapture={onEnded}
                onDurationChange={(ev) => {
                    if (ev.currentTarget.duration !== Infinity) {
                        console.log(ev.currentTarget.duration);
                    }
                }}
            >
                <source
                    src={srcAudio} // test audio http://d2cstorage-a.akamaihd.net/wbr/gotnext/8578.mp3
                    type="audio/mp3"
                />
            </audio>
        </>
    );
});

Audio.displayName = 'Audio';