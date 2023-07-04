import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Audio } from '../components/Audio';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface IAudioPageProps {
    className?: string;
}

export const AudioPage = memo((props: IAudioPageProps) => {
    const {
        className = '',
    } = props;

    const navigate = useNavigate();
    const audio = useSelector((state: RootState) => state.audio.value)

    return (
        <>
            <div className="main-content-wrap">
                <Audio srcAudio={audio}/>
            </div>
        </>
    );
})

AudioPage.displayName = 'AudioPage'