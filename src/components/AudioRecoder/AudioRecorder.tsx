import React, { memo, useEffect, useRef } from 'react';

interface AudioRecorderProps {
    className?: string;
}

export const AudioRecorder = memo((props: AudioRecorderProps) => {
    const {
        className = '',
    } = props;

    // @ts-ignore
    const mediaRecorder = useRef<ReturnType<MediaRecorder>>()

    const handleStartRecording = () => {
        mediaRecorder.current.start();
    }
    const handleStopRecording = () => {
        mediaRecorder.current.stop();
    }

    const voice = useRef([]);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
            mediaRecorder.current = new MediaRecorder(stream);
            mediaRecorder.current.addEventListener('dataavailable', function (event: BlobEvent) {
                // @ts-ignore
                voice.current.push(event.data);
                console.log(event)
            });
            mediaRecorder.current.addEventListener('stop', function () {
                const blob = new Blob(voice.current, {
                    'type': 'audio/mp3',
                });
                const audioUrl = URL.createObjectURL(blob);
                const audio = new Audio(audioUrl);
                // @ts-ignore
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const analyser = audioContext.createAnalyser()
                console.log(audioContext)
                const source = audioContext.createMediaElementSource(audio);

                fetch(audioUrl)
                    .then(response => response.arrayBuffer())
                    .then(data => audioContext.decodeAudioData(data))
                    .then(audioBuffer => {
                        const dataArray = new Uint8Array(audioBuffer.length);
                        const newArr = audioBuffer.sampleRate
                        console.log(newArr)
                    });
            });
        });
    }, []);
    return (
        <div>
            <button onClick={handleStartRecording}>
                start record
            </button>

            <button onClick={handleStopRecording}>
                stop record
            </button>
        </div>
    );
})

AudioRecorder.displayName = 'AudioRecorder'