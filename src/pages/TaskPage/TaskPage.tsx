import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { handleEndedTask, setLocationCurrent } from '../../store/slices/audioDataSlice';

interface IMainPageProps {
    className?: string;
}

export const TaskPage = memo((props: IMainPageProps) => {
    const {
        className = '',
    } = props;
    
    
    const [
        microAvailable,
        setMicroAvailable,
    ] = useState(false);
    
    const [
        error,
        setError,
    ] = useState(false);
    
    const handleAudioDevice = () => {
        navigator.mediaDevices.getUserMedia({ audio: true }).then(() => {
            setMicroAvailable(true)
            if (microAvailable && !isChecked) {
                dispatch(setLocationCurrent('/micro/mic-check'))
            }
        }).catch((e) => {
            setError(true)
            console.error(e);
        })
    }
    const dispatch = useDispatch()
    
    const isChecked = useSelector((state: RootState) => state.audio.isChecked)
    const isEnded = useSelector(handleEndedTask)
    
    useEffect(() => {
        if (microAvailable && !isChecked) {
            dispatch(setLocationCurrent('/micro/mic-check'))
        }
        if (isEnded) {
            dispatch(setLocationCurrent('/micro/ended'))
        }
        if (isChecked) {
            dispatch(setLocationCurrent('/micro/pause-before'))
        }
    }, [ dispatch, isChecked, isEnded, microAvailable ]);
    
    const locationCurrent = useSelector((state: RootState) => state.audio.locationCurrent);
    const locationStart = useSelector((state: RootState) => state.audio.locationStart);
    
    return (
        <div className="main-content-wrap">
            <div className="container vertikal">
                <div className="main-content__text">
                    <div className="audio-text">
                        {error
                            ?
                            // @ts-ignore
                            <div dangerouslySetInnerHTML={{ __html: window.settingsForMicro.errorMicro }}></div>
                            // eslint-disable-next-line max-len
                            // @ts-ignore
                            : <div dangerouslySetInnerHTML={{ __html: window.settingsForMicro.startHtml }}></div>}
                    </div>
                    <button
                        className="audio-button button-blue"
                        onClick={handleAudioDevice}
                    >
                        Запросить доступ
                    </button>
                </div>
            </div>
        </div>
    );
})


TaskPage.displayName = 'MainPage'