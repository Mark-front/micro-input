import React, { memo, useEffect, useRef } from 'react';
import { CountdownTimer } from '../CountdownTimer/CountdownTimer';

interface AudioRecorderProps {
    className?: string;
    getAudio: (audioFile: string) => void
}

export const AudioRecorder = memo((props: AudioRecorderProps) => {
    const {
        className = '',
        getAudio,
    } = props;

    const mediaRecorder = useRef<MediaRecorder>()
    const handleStartRecording = () => {
        console.log(mediaRecorder.current)
        if (mediaRecorder.current) {
            mediaRecorder.current.start();
        }
    }
    const handleStopRecording = () => {
        console.log(mediaRecorder.current)
        if (mediaRecorder.current) {
            mediaRecorder.current.stop();
        }
    }

    const voice = useRef([]);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
            mediaRecorder.current = new MediaRecorder(stream as MediaStream);
            handleStartRecording()
            mediaRecorder.current.addEventListener('dataavailable', function (event: BlobEvent) {
                // @ts-ignore
                voice.current.push(event.data);
            })
            mediaRecorder.current.addEventListener('stop', function () {
                const blob = new Blob(voice.current, {
                    'type': 'audio/mp3',
                });
                const reader = new FileReader()
                reader.readAsDataURL(blob)

                reader.onload = () => {
                    console.log(String(reader.result))
                    getAudio(String(reader.result))
                }
            });
        }).catch((e) => {
            console.error(e);
        })
    }, [ getAudio ]);

    return (
        <>
            <CountdownTimer
                className={'countdown-red'}
                time={3} isPlay={true}
                onEnd={handleStopRecording}
            />
        </>
    );
})

AudioRecorder.displayName = 'AudioRecorder'