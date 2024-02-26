import React, {useContext} from 'react';
import {dayToDate} from "../lib/constants";
import {PanelContext} from "../context/PanelContext";

export const Day = ({className, indexDay}) => {
    const {setCurrentDay, setShow} = useContext(PanelContext);

    const longPressEvent = () => {
        setCurrentDay(indexDay);
        setShow(true);
    }

    return (<div className="relative">
        <div
            onClick={longPressEvent}
            title={`${dayToDate(indexDay).toLocaleDateString()}`}
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