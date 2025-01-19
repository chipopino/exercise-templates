import classNames from 'classnames';
import React, { ReactNode } from 'react';
import { cn } from 'shared/methodes';
import 'styles/components/btn.css';

interface BtnProps {
    children?: ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
}

export default function Btn(props: BtnProps) {

    const { onClick, children, disabled } = props;

    const btnProps = {
        onClick, children, disabled,
        className: cn(
            props.className,
            props.disabled && 'disabled',
            'btn p-1 select-none'
        )
    };

    return <button{...btnProps}>
        {children}
    </button>;
}
