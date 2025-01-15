import React, { useEffect, useRef } from 'react';

class Vec2 {
    x: number; y: number;
    constructor(xy: { x?: number, y?: number }) {
        this.x = xy.x || 0;
        this.y = xy.y || 0;
    }
}

type swipeType = 'left' | 'right' | 'up' | 'down';

interface swipeEventType {
    direction?: swipeType;
    pstart?: Vec2;
    pend?: Vec2;
    diffX?: number;
    diffY?: number;
    length?: number;
}

function swipe(
    pstart: Vec2,
    pend: Vec2,
    onSwipe: (swipeEvent: swipeEventType) => void,
    swipeThreshold: number
) {
    const diffX = pend.x - pstart.x;
    const diffY = pend.y - pstart.y;
    const length = Math.sqrt(diffX * diffX + diffY * diffY);

    const swipeEvent = {
        pstart, pend, diffX, diffY, length
    }

    if (length > swipeThreshold) {
        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX > 0) {
                onSwipe({ ...swipeEvent, direction: 'right' });
            } else {
                onSwipe({ ...swipeEvent, direction: 'left' });
            }
        } else {
            if (diffY > 0) {
                onSwipe({ ...swipeEvent, direction: 'down' });
            } else {
                onSwipe({ ...swipeEvent, direction: 'up' });
            }
        }
    }
}

interface ClickType {
    className?: string;
    children: React.ReactNode;
    onClickStart?: any;
    onClickEnd?: any;
    onSwipe?: (evt: swipeEventType) => void;
    onDoubleClick?: (evt: { pos: Vec2 }) => void;
    onContext?: () => void;
    swipeLengthThreashold?: number;
    isClickEndOutside?: boolean;
    doubleClickTimeout?: number;
    style?: any;
}
export default function Click(props: ClickType) {

    const isClickedOnce = useRef(false);
    const pstart = useRef<Vec2>({ x: 0, y: 0 });
    const pend = useRef<Vec2>({ x: 0, y: 0 });

    const onSwipe = () => swipe(
        pstart.current, pend.current,
        props.onSwipe ? props.onSwipe : () => { },
        props.swipeLengthThreashold || 100
    );

    function doubleClickFunctionallity(delay: number) {
        if (isClickedOnce.current) {
            props.onDoubleClick?.({ pos: pstart.current });
            isClickedOnce.current = false; // prevents triple click
        } else {
            isClickedOnce.current = true;
            setTimeout(() => {
                isClickedOnce.current = false;
            }, props.doubleClickTimeout || delay)
        }
    }

    function mouseUpEvt(evt: MouseEvent | React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (pstart.current.x || pstart.current.y) {
            pend.current = { x: evt.clientX, y: evt.clientY };
            props.onClickEnd?.({ ...evt, pstart: pstart.current, pend: pend.current });
            onSwipe();
        }
        pstart.current = { x: 0, y: 0 };
    }
    function touchEndEvt(evt: TouchEvent | React.TouchEvent<HTMLDivElement>) {
        if (pstart.current.x || pstart.current.y) {
            const touch = evt.changedTouches[0];
            pend.current = { x: touch.clientX, y: touch.clientY };
            props.onClickStart?.({ ...evt, pstart: pstart.current });
            onSwipe();
        }
        pstart.current = { x: 0, y: 0 };
    }

    useEffect(() => {
        if (props.isClickEndOutside) {
            window.addEventListener('mouseup', mouseUpEvt);
            window.addEventListener('touchend', touchEndEvt);
        }
    }, [])

    return <div
        style={props.style}
        className={props.className || ''}
        onMouseUp={!props.isClickEndOutside ? mouseUpEvt : () => { }}
        onTouchEnd={!props.isClickEndOutside ? touchEndEvt : () => { }}
        onMouseDown={(evt) => {
            doubleClickFunctionallity(200);
            pstart.current = { x: evt.clientX, y: evt.clientY };
            props.onClickStart?.({ ...evt, pstart: pstart.current });
        }}
        onTouchStart={(evt) => {
            doubleClickFunctionallity(50);
            const touch = evt.touches[0];
            pstart.current = { x: touch.clientX, y: touch.clientY };
            props.onClickStart?.({ ...evt, pstart: pstart.current });
        }}
        onContextMenu={(evt) => {
            if (props.onContext && !process.env.NO_CONTEXT) {
                evt.preventDefault();
                props.onContext();
            }
        }}
    >
        {props.children}
    </div>
}