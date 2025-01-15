import React, { useState, useCallback } from 'react';
import Click from 'components/Click';
import Btn from 'components/Btn';
import { isT } from 'shared/constants';
import { SwipeIcon, SwipeIconLeft, SwipeIconRight } from 'components/Icons';

interface collectionType {
    exercises: number[];
}
export default function Collection(props: collectionType) {

    const [tab, setTab] = useState<number>(0);
    const { exercises } = props;
    const tabs = exercises.length;

    function goBack() {
        setTab((prevTab) => {
            if (prevTab > 0) {
                return prevTab - 1;
            }
            return prevTab;
        });
    };
    function goNext() {
        setTab((prevTab) => {
            if (prevTab < tabs - 1) {
                return prevTab + 1;
            }
            return prevTab;
        });
    }

    const nextJsx = <Btn
        disabled={!(tab > 0)}
        className='absolute left-0 bottom-0 i_px-1 i_py-0'
        onClick={goBack}
    >
        &lt;
    </Btn>

    const backJsx = <Btn
        disabled={!(tab < tabs - 1)}
        className='absolute right-0 bottom-0 i_px-1 i_py-0'
        onClick={goNext}
    >
        &gt;
    </Btn>

    const SwipStyle = { width: '18px', margin: '2px', color:'green', fill:'var(--swipe-icon-color)' };
    const mbSwipeJsx = <div className='absolute bottom-0 right-0'>
        {tab === 0 && <SwipeIconRight style={SwipStyle} />}
        {(tab > 0 && tab < tabs - 1) && <SwipeIcon style={SwipStyle} />}
        {tab === tabs - 1 && <SwipeIconLeft style={SwipStyle} />}
    </div>

    function isDsp(index: number) {
        return tab > index - 2 && tab < index + 2;
    }

    return <Click
        isClickEndOutside
        onSwipe={(evt) => {
            if (isT) {
                if (evt.direction === 'left') {
                    goNext();
                } else if (evt.direction === 'right') {
                    goBack();
                }
            }
        }}
        className='w-full h-full overflow-hidden'
    >
        <div
            style={{ transform: `translateX(-${100 * tab}%)` }}
            className='relative w-full h-full flex transition'
        >
            {exercises.map((e, i) =>
                <div
                    key={`k_2356346257_${e}`}
                    style={{ minWidth: '100%' }}
                    className='w-full h-full grid-center'
                >
                    {/*@ts-ignore*/}
                    {isDsp(i) && <exercise-tag eid={e} class='w-full h-full contents' />}
                </div>)
            }
        </div>
        {(!isT && tabs > 1) && nextJsx}
        {(!isT && tabs > 1) && backJsx}
        {(isT && tabs > 1) && mbSwipeJsx}
    </Click>
}