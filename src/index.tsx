import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './store/store'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
// @ts-ignore
// window.settingsForMicro = {
//     testPath: '/db.json',
//     userId: 'sadfqwe12341234123',
//     ajaxPath: '/local/ajax/',
//     audioImg: 'static/media/audio-icon.svg',
//     formAjaxPath: '/micro/form.php',
//     uploadAjaxPath: '/micro/upload.php',
//     audioPeep: 'media/peep.mp3',
//     successHTML: '<div className="green"> Тест успешно пройден</div>',
//     startHtml: '<div className=""> Мы начинаем</div>',
//     testHtml: '<div className=""> Мы тестируем</div>',
//     nextHtml: '<div className=""> Мы продолжаем</div>',
//     sendHtml: '<div className=""> Мы отправляем</div>',
// }
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
);
