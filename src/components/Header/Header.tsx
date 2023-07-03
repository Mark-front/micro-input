import React, { memo } from 'react';

interface IHeaderProps {
    className?: string;
}

export const Header = memo((props: IHeaderProps) => {
    const {
        className = '',
    } = props;

    return (
        <div className={''}>

        </div>
    );
})

Header.displayName = 'Header'