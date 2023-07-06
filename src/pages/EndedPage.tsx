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

    formData.append('action', action)

    for (const key in data) {
        formData.append(key, data[key]);
    }

    const res = await fetch('/local/ajax/', {
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
    const sendFeedback = async () => {
        await fetchRequest({
            action: 'WebForm/sendAnswer',
            data: { 'data': JSON.stringify(answer) },
        })
    }


    return (
        <div className="main-content-wrap">
            <div className="container vertikal">
                <div className="audio-text">Отправить результат</div>
                <form encType='multipart/form-data' method='post' name="audio_send" action="index.php"
                    onSubmit={sendFeedback}>
                    <input name="audio" type="hidden" value="ok"/>
                    <button type="submit" className="audio-button button-red">Отправить результат</button>
                </form>
            </div>
        </div>
    );
})


EndedPage.displayName = 'EndedPage'