import React, {useContext, useEffect, useRef, useState} from 'react';
import {PanelContext} from "../context/PanelContext";
import {dayToDate} from "../lib/constants";

export const Panel : React.FC = ({children}) => {
    const {show, setShow, currentDay} = useContext(PanelContext);
    const [day, setDay] = useState('');
    const panelRef = useRef(null);
    const [activities, setActivities] = useState([]);

    const onClickActivity = (activity) => {}

    useEffect(() => {
        if(!isNaN(currentDay || 0)) {
            setDay(dayToDate(currentDay || 0).toLocaleDateString());
        }

        setActivities([
            {
                id: 1,
                type: 2,
                name: "Cross",
                color: "blue-400"
            },
            {
                id: 2,
                type: 1,
                name: "Biblia",
                color: "rose-400"
            },
            {
                id: 3,
                type: 3,
                name: "Smartfit",
                color: "yellow-400"
            }
        ])
    }, [currentDay]);

    return <>
        {
            show ? <div className="
            w-screen
            h-screen
            top-0
            right-0
            left-0
            bottom-0
            flex
            justify-center
            items-center
            fixed
            z-1
        "
            style={{
                backgroundColor: "rgba(0, 0, 0, 0.6)"
            }}
            onClick={() => {
                setShow(false)
            }}
        >
            <div className="
                border
                rounded
                bg-white
                p-4
                lg:min-w-[400px]
                lg:min-h-[300px]
                min-w-10/12
                min-h-10/12
                z-10
                fixed
                text-gray-800
                flex flex-col
            "
                 ref={panelRef}
                 onClick={(ev) => {
                     ev.stopPropagation();
                 }}
            >
                <div className="mb-4">Día: {currentDay} - {day}</div>
                <div className="flex justify-between mb-4">
                    {
                        activities.map((activity, index) => {
                            return <div key={index}
                                className="flex flex-col"
                                onClick={() => {
                                    onClickActivity(activity);
                                }}
                            >
                                <div>{activity.name}</div>
                                <div className={`
                                    rounded-full 
                                    h-16 
                                    w-16 
                                    border 
                                    bg-${activity.color}
                                `}>

                                </div>
                            </div>
                        })
                    }
                </div>
                <div className="flex justify-end">
                    <div className="flex flex-col ">
                        <div>Otro</div>
                        <div className="rounded-full h-16 w-16 border">

                        </div>
                    </div>
                </div>
            </div>
        </div> : null
        }
    </>
}

