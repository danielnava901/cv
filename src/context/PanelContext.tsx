import React, {createContext, useState} from "react";

type PanelContextType = {
    show: boolean,
    setShow: any,
    currentDay: number|null,
    setCurrentDay: any
}

export const PanelContext = createContext<PanelContextType>({
    show: false,
    setShow: () => {},
    currentDay: null,
    setCurrentDay: () => {}
});

export const PanelProvider = ({children}) => {
    const [show, setShow] = useState(false);
    const [currentDay, setCurrentDay] = useState(null);

    return <PanelContext.Provider
        value={{
            show,
            setShow,
            currentDay,
            setCurrentDay
        }}>
        {children}
    </PanelContext.Provider>
}