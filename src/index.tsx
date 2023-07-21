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
// }
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
);
