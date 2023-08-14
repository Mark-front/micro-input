import React, { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface IRequestProps {
    action?: string,
    data?: Record<string, any>,
    path: string
}

export const EndedPage = memo(() => {
    const answerFiles = useSelector((state: RootState) => state.audio.fileData)
    
    const [ success, setSuccess ] = useState(false);
    // @ts-ignore
    const sendFeedback = async (ev) => {
        ev.preventDefault()
        // @ts-ignore
        const response = await fetch(window.settingsForMicro.formAjaxPath, {
            method: 'POST',
            // @ts-ignore
            body: JSON.stringify({ fileNames: [ ...answerFiles ], studentID: window.settingsForMicro.userId }),
        }).then((response) => {
            response.status === 200 && setSuccess(true)
        })
    }
    if (success) {
        return (
            <div className="main-content-wrap">
                <div className="container vertikal" dangerouslySetInnerHTML={// @ts-ignore
                    { __html: window.settingsForMicro.successHTML }}>
                </div>
            </div>
        )
    }
    return (
        <div className="main-content-wrap">
            <div className="container vertikal">
                <div className="audio-text" dangerouslySetInnerHTML={// @ts-ignore
                    { __html: window.settingsForMicro.sendHtml }}>
                </div>
                <form
                    encType='multipart/form-data'
                    method='post' name="audio_send"
                    onSubmit={sendFeedback}>
                    <input name="audio" type="hidden" value="ok"/>
                    <button type="submit" className="audio-button button-red">Отправить результат</button>
                </form>
            </div>
        </div>
    );
})


EndedPage.displayName = 'EndedPage'
