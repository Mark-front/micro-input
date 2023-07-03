import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Audio } from '../components/Audio';

interface IAudioPageProps {
    className?: string;
}

export const AudioPage = memo((props: IAudioPageProps) => {
    const {
        className = '',
    } = props;

    const navigate = useNavigate();

    return (
        <>
            <div className="main-content-wrap">
                <Audio srcAudio={''}/>
            </div>
        </>
    );
})

AudioPage.displayName = 'AudioPage'