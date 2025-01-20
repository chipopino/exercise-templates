import React, { useEffect, useRef, useState } from 'react';
import Blank from 'exercises/Blank';
import Flip from 'exercises/Flip';
import Classic from 'exercises/Classic';
import Collection from './exercises/Collection';
import { loremIpsum } from 'shared/constants';
import { sizesType } from 'shared/types';
import { cn } from './shared/methodes';
import 'styles/root.css';
import 'styles/shared.css';
import 'styles/chipopino.css';


const mockhDelay = 0;
const isMockError = false;

interface rawExerciseType {
    type: string;
    content: any;
}

const blankMock = {
    "type": "blank",
    "content": {
        "blank": loremIpsum,
    }
}
const flipMock = {
    "type": "flip",
    "content": {
        "exercise": "exercise mock aaaaaaaaaa aaaaaaaaaaa2",
        "answer": loremIpsum,
    }
}
const classicMock = {
    "type": "classic",
    "content": {
        "exercise": loremIpsum,
        "hint": "",
        "answer": "answer mock",
        "explain": "explain mock"
    }
}
const collectionMock = {
    // doesnt work with DEV
    "type": "collection",
    "content": { exercises: [] }
}
const mock = collectionMock;




type exerciseStateType = 'undefined' | 'loading' | 'error' | 'success';

async function fetchData(eid: string, mock: any, isError?: boolean, timeout?: number) {

    let finUrl = ''
    if (process.env.MAIN_PORT) {
        finUrl = `${process.env.MAIN_URL}:${process.env.MAIN_PORT}/exercises/${eid}/`
    } else {
        finUrl = `${process.env.MAIN_URL}/exercises/${eid}/`
    }

    return new Promise((resolve, reject) => {
        if (process.env.DEV) {
            setTimeout(() => {
                if (isError) {
                    reject("mock error");
                } else {
                    resolve(mock);
                }
            }, timeout || 500)
        } else {
            fetch(finUrl)
                .then(res => res.json())
                .then(data => {
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                })
        }
    });
};

function Loader() {
    return <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 100 100"
        className="spinner"
    >
        <circle
            cx="50"
            cy="50"
            r="35"
            stroke="#000"
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="164 56"
        />
    </svg>
}

function ErrorIcon() {
    return (
        <svg
            width="30"
            height="30"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            className='opecity-50'
        >
            <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2M12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8"></path>
        </svg>
    );
}


function PreExercise(props: any) {
    return <div className='w-full h-full flex-center'>
        {props.children}
    </div>
}

export default function Exercise(
    { eid, rawExercise, className }:
        { eid: string, rawExercise?: any, className?: string }
) {
    const ref = useRef();
    const [sizes, setSizes] = useState<{} | sizesType>({});

    const [resource, setResoutce] = useState<rawExerciseType>({ type: "", content: {} });
    const [exerciseState, setExerciseState] = useState<exerciseStateType>('undefined');

    const isLoading = exerciseState === 'loading';
    const isError = exerciseState === 'error';
    const isSuccess = exerciseState === 'success';

    const exerciseMap = {
        "none": () => { },
        "blank": Blank,
        "flip": Flip,
        "classic": Classic,
        "collection": Collection,
    }
    //@ts-ignore
    const MainExercise = exerciseMap[resource.type || 'none'];

    useEffect(() => {
        setExerciseState('loading');
        if (rawExercise) {
            setExerciseState('success');
            setResoutce(rawExercise);
        } else {
            fetchData(eid, mock, isMockError, mockhDelay)
                .then(res => {
                    setExerciseState('success');
                    //@ts-ignore
                    setResoutce(res);
                })
                .catch(err => {
                    setExerciseState('error');
                })
        }

        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const width = entry.contentRect.width;
                const height = entry.contentRect.height;
                setSizes({
                    width: {
                        w_sm: width >= 200,
                        w_md: width >= 400,
                        w_lg: width >= 600,
                        w_xl: width >= 800,
                        w_l_sm: width <= 200,
                        w_l_md: width <= 400,
                        w_l_lg: width <= 600,
                        w_l_xl: width <= 800,
                    },
                    height: {
                        h_sm: height >= 200,
                        h_md: height >= 400,
                        h_lg: height >= 600,
                        h_xl: height >= 800,
                        h_l_sm: height <= 200,
                        h_l_md: height <= 400,
                        h_l_lg: height <= 600,
                        h_l_xl: height <= 800,
                    },
                })
            }
        });
        //@ts-ignore
        observer.observe(ref.current);
        return () => observer.disconnect();

    }, []);

    return <div
        //@ts-ignore
        ref={ref}
        className={cn('__no_prefix_card_body chipopino-css-prefix', className)}
    >
        {isLoading && <PreExercise><Loader /></PreExercise>}
        {isError && <PreExercise><ErrorIcon /></PreExercise>}
        {isSuccess && <MainExercise {...resource.content} {...sizes} />}
    </div>
}

// class ExerciseTag extends HTMLElement {
//     private _reactElm: Root | null = null;

//     constructor() {
//         super();
//     }
//     connectedCallback() {
//         if (!this._reactElm) {
//             this._reactElm = createRoot(this);
//         }

//         const eid = this.getAttribute('eid') || '';
//         const rawExercise = this.getAttribute('rawExercise') || '';

//         this._reactElm.render(
//             <Exercise
//                 eid={eid}
//                 rawExercise={rawExercise && JSON.parse(rawExercise)}
//             />
//         );
//     }
// }
// customElements.define('exercise-tag', ExerciseTag);
