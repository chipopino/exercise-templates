import React, { useState } from 'react';
import Content from 'components/Content';
import { sizesType } from 'shared/types';
import { cn } from 'shared/methodes';
import Click from 'components/Click';
import Btn from 'components/Btn';
import { isT } from 'shared/constants'
import 'styles/exercises/classic.css'

type tabType = 'exercise' | 'hint' | 'answer' | 'explain';
interface classicType {
    exercise: string;
    hint: string;
    answer: string;
    explain: string;
}
export default function Classic(props: classicType & sizesType) {

    const { exercise, hint, answer, explain } = props;
    const w_md = props?.width?.w_md;
    const w_l_md = props?.width?.w_l_md;
    const h_l_md = props.height?.h_l_md;

    let tabs = { exercise, hint, answer, explain };
    //@ts-ignore
    tabs = Object.fromEntries(
        Object.entries(tabs).filter(([key, value]) => !!value)
    );

    const [tab, setTab] = useState<tabType>('exercise');
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    const cnMenu = cn(
        'w-full flex flex-col justify-center',
        w_md && 'i_flex-row horizontal-menu',
        w_l_md && 'absolute bottom-0 left-0 vertical-menu transition',
        (w_l_md && menuOpen) && 'menu-open-v',
        (w_l_md && !menuOpen) && 'menu-closed-v',
    )

    const cnSideMenu = cn(
        'absolute flex flex-col h-full vertical-menu transition',
        menuOpen ? 'menu-open' : 'menu-closed'
    )

    return <Click
        onContext={() => setMenuOpen(old => !old)}
        className='w-full h-full flex flex-col relative overflow-hidden'
    >
        <div
            className={cn(
                isT && 'select-none',
                'grow grid-center',
                'scroll-y thin-scrollbar',
                'p-2 text-center transparent-bottom'
            )}
        >
            <Content
                className={'text-center paragraph'}
                content={tabs[tab]}
            />
        </div>
        <div className={cn(h_l_md ? cnSideMenu : cnMenu)}>
            {Object.keys(tabs).map(t =>
                <Btn
                    key={`k_237578578_${t}`}
                    className={cn(
                        h_l_md && 'flex-1 px-1 py-0',
                        t === tab && 'bg-btn-selected'
                    )}
                    onClick={() => {
                        setTab(t as tabType);
                        setTimeout(() => setMenuOpen(false), 100);
                    }}
                >
                    {t}
                </Btn>
            )}
        </div>
    </Click>
}