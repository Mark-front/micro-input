import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface IRequestProps {
    action: string,
    data?: Record<string, any>
}

const fetchRequest = async (props: IRequestProps) => {
    const {
        action, data,
    } = props;
    
    const formData = new FormData();
    console.log(data)
    formData.append('action', action)
    
    for (const key in data) {
        formData.append(key, data[key]);
    }
    // @ts-ignore
    formData.append('userId', window.settingsForMicro.userId);
    
    // @ts-ignore
    const res = await fetch(window.settingsForMicro.ajaxPath, {
        method: 'post',
        body: formData,
    })
        .then((response) => response.json())
        .catch((error) => {
            console.log(error)
        });
    
    return res
}

export const EndedPage = memo(() => {
    const answer = useSelector((state: RootState) => state.audio.value)
    // @ts-ignore
    const sendFeedback = async (ev) => {
        ev.preventDefault()
        let newObj = {}
        const newData = answer.map((item, index) =>
            // @ts-ignore
            ({ [`${window.settingsForMicro.userId + '_' + index}`]: `${item}` }))
        newData.forEach((item) => {
            newObj = { ...newObj, ...item }
        })
        await fetchRequest({
            action: 'WebForm/sendAnswer',
            data: newObj,
        })
    }
    return (
        <div className="main-content-wrap">
            <div className="container vertikal">
                <div className="audio-text">Отправить результат</div>
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