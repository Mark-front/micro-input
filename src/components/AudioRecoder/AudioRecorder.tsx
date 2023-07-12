import React, { memo, useEffect, useRef } from 'react';
import { CountdownTimer } from '../CountdownTimer/CountdownTimer';
import { useNavigate } from 'react-router-dom';
import { Step } from '../../store/types';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentStep, setCurrentStepNumber } from '../../store/slices/audioDataSlice';
import { RootState } from '../../store/store';

interface AudioRecorderProps {
    className?: string;
    getAudio: (audioFile: string) => void
    step?: Step
}

export const AudioRecorder = memo((props: AudioRecorderProps) => {
    const {
        className = '',
        getAudio,
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
    const currentStep = useSelector(getCurrentStep)
    const isChecked = useSelector((state: RootState) => state.audio.isChecked)
    const dispatch = useDispatch()
    const currentStepNumber = useSelector((state: RootState) => state.audio.currentStepNumber);
    const allStepNumber = useSelector((state: RootState) => state.audio.allStepNumber);


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
                    if (currentStepNumber >= allStepNumber) {
                        navigate('/ended')
                    } else {
                        if (!isChecked) {
                            navigate('/audio')
                        } else {
                            dispatch(setCurrentStepNumber())
                            navigate('/question')
                        }
                    }

                }
            });
        }).catch((e) => {
            console.error(e);
        })
    }, [ allStepNumber, currentStepNumber, dispatch, getAudio, isChecked, navigate ]);

    return (
        <>
            <CountdownTimer
                className={'countdown-red'}
                time={currentStep?.timeForAnswer ?? 60}
                isPlay={true}
                onEnd={handleStopRecording}
            />
        </>
    );
})

AudioRecorder.displayName = 'AudioRecorder'