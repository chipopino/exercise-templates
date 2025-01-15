import React from 'react';
import Content from 'components/Content';
import Click from 'src/components/Click';

interface blankType {
    blank: string;
}
export default function Blank(props: blankType) {
    return <Click
        onContext={() => { }}
        className='w-full h-full overflow-hidden grid-center bg-blank'
    >
        <Content
            className='p-2 border-box text-center paragraph grid-center w-full h-full scroll-y'
            content={props.blank}
        />
    </Click>
}