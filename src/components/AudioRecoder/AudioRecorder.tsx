import React, { memo, useEffect, useRef } from 'react';
import { CountdownTimer } from '../CountdownTimer/CountdownTimer';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Step } from '../../store/types';

interface AudioRecorderProps {
    className?: string;
    getAudio: (audioFile: string) => void
    postAnswer: (audioFile: string) => void
    step?: Step
}

export const AudioRecorder = memo((props: AudioRecorderProps) => {
    const {
        className = '',
        getAudio,
        postAnswer,
        step,
    } = props;

    const mediaRecorder = useRef<MediaRecorder>()
    const handleStartRecording = () => {
        if (mediaRecorder.current) {
            mediaRecorder.current.start();
        }
    }
    const handleStopRecording = () => {
        if (mediaRecorder.current) {
            mediaRecorder.current.stop();
        }
    }

    const voice = useRef([]);
    const navigate = useNavigate();

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
                    getAudio(String(reader.result))
                    postAnswer(String(reader.result))
                    navigate('/audio')
                }
            });
        }).catch((e) => {
            console.error(e);
        })
    }, [ getAudio, navigate, postAnswer ]);

    return (
        <>
            <CountdownTimer
                className={'countdown-red'}
                time={step?.timeForAnswer ?? 60} isPlay={true}
                onEnd={handleStopRecording}
            />
        </>
    );
})

AudioRecorder.displayName = 'AudioRecorder'