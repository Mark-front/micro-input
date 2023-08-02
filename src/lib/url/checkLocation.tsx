import React, { memo, ReactNode } from 'react';

export type valType =
    '/micro/pause'
    | '/micro/mic-check'
    | '/micro/recorder'
    | '/micro/audio'
    | '/micro/question'
    | '/micro/ended'
    | '/'

interface IcheckLocationProps {
    val: valType;
    children: ReactNode
}

export const CheckLocation = memo((props: IcheckLocationProps) => {
    const {
        val,
        children,
    } = props;
    
    
    return (
        <>
            {children}
        </>
    );
})

CheckLocation.displayName = 'checkLocation';


