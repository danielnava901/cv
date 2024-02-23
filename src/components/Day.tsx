import React, {useState} from 'react';
import {dayToDate} from "../lib/constants";

export const Day = ({className, indexDay}) => {
    const [showTitle, setShowTitle] = useState(false);

    const hideTitle = () => {
        setTimeout(() => {
            setShowTitle(false);
        }, 2000);
    }

    return (<div className="relative">
        <div
            title={`${dayToDate(indexDay).toLocaleDateString()}`}
            onClick={() => {
                setShowTitle(true);
                hideTitle();
            }}
            className={`
                relative
                w-12 h-12
                border border-gray-400
                rounded-full
                flex justify-center items-center
                text-white
                ${className}
           `}

        >
            {indexDay}
        </div>
        {
            showTitle ? <Title>{dayToDate(indexDay).toLocaleDateString()}</Title> : null
        }
    </div>)
}


export const Title : React.FC = ({children}) => {
    return <div className="
        absolute
        top-0
        right-0
        p-2
        bg-black
        text-white
        text-xs
        rounded
        opacity-75
    ">
        {children}
    </div>
}