import React, { memo, useEffect, useRef } from 'react';
import { CountdownTimer } from '../CountdownTimer/CountdownTimer';
import { Step } from '../../store/types';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentStep, setCurrentStepNumber, setLocationCurrent } from '../../store/slices/audioDataSlice';
import { RootState } from '../../store/store';
// @ts-ignore
import lamejs from 'lamejs';

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
                console.log(voice.current)
                
                reader.onload = async () => {
                    getAudio(String(reader.result))
                    
                    
                    const mp3File = new File([ blob ], 'microphone.mp3', {
                        type: 'audio/mp3',
                    })
                    // if (isChecked) {
                    
                    // @ts-ignore
                    const res = await fetch(window.settingsForMicro.uploadAjaxPath, {
                        method: 'post',
                        body: JSON.stringify({
                            'uploadedFile': mp3File,
                            // @ts-ignore
                            'userId': window.settingsForMicro.userId,
                        }),
                    })
                        .then((response) => response.json())
                        .catch((error) => {
                            console.log(error)
                        });
                    
                    // const response = await fetchRequest({
                    //     action: 'WebForm/sendAnswer',
                    //     data: {
                    //         'uploadedFile': [ blob, 'microphone.mp3' ],
                    //     },
                    //     // @ts-ignore
                    //     'path': window.settingsForMicro.uploadAjaxPath,
                    // })
                    console.log(res)
                    // }
                    
                    if (currentStepNumber >= allStepNumber) {
                        dispatch(setLocationCurrent('/micro/ended'))
                    } else {
                        if (!isChecked) {
                            dispatch(setLocationCurrent('/micro/audio'))
                        } else {
                            dispatch(setLocationCurrent('/micro/next'))
                            dispatch(setCurrentStepNumber())
                        }
                    }
                    
                }
            });
        }).catch((e) => {
            console.error(e);
        })
    }, [ allStepNumber, currentStepNumber, dispatch, getAudio, isChecked ]);
    
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