import React, {createContext, useState} from 'react';

// to hold state of article id client clicked on
export const ClickContext = createContext();

export const ClickData = props => {

    let [id, changeID] = useState('');

    return(
        <ClickContext.Provider value={[id, changeID]}>
            {props.children}
        </ClickContext.Provider>
    );
}