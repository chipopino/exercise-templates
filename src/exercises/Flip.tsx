import React, { useState } from 'react';
import Content from 'components/Content';
import Click from 'components/Click';
import { cn } from 'shared/methodes';
import 'styles/exercises/flip.css';

interface blankType {
    exercise: string;
    answer: string;
}
export default function Blank(props: blankType) {

    const [isFront, setIsFront] = useState(true);

    const cnContent = cn(
        'w-full h-full grid-center',
        'pos scroll-y thin-scrollbar',
        'text-center p-2 border-box',
        'transition no-backside',
    )

    return <Click
        className='w-full h-full relative'
        onContext={() => setIsFront(old => !old)}
    >
        <div className={cn(cnContent, isFront ? 'rotate-y-0 z-10' : 'rotate-y-180',)}>
            <Content
                className={'paragraph'}
                content={props.exercise}
            />
        </div>

        <div className={cn(cnContent, !isFront ? 'rotate-y-0 z-10' : 'rotate-y-180',)}>
            <Content
                className={'paragraph'}
                content={props.answer}
            />
        </div>

    </Click>
}