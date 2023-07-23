import React, { memo } from 'react';
import { setLocationCurrent } from '../store/slices/audioDataSlice';
import { useDispatch } from 'react-redux';

export const NextPage = memo(() => {
    const dispatch = useDispatch();
    return (
        <div className="main-content__text">
            <div className="audio-text text-next">У вас все отлично получается, переходите к следующему вопросу,
                если стало сложно завершите тест.
            </div>
            
            <button className="audio-button button-red button-next" onClick={() => {
                dispatch(setLocationCurrent('/micro/pause-before'))
            }}>Следующий вопрос
            </button>
            
            <div>
                <input name="audio" type="hidden" value="ok"/>
                <button type="submit" className="audio-button button-end" onClick={() => {
                    dispatch(setLocationCurrent('/micro/ended'))
                }}>
                    Завершить тест
                </button>
            </div>
        </div>
    );
})


NextPage.displayName = 'NextPage'