import React, { memo, ReactNode } from 'react';

export type valType = '/pause' | '/mic-check' | '/recorder' | '/audio' | '/question' | '/ended' | '/'

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