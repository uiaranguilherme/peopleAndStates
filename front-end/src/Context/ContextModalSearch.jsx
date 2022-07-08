import React, { useState ,createContext } from 'react'

export const ContextSearch = createContext();

function ContextModalSearch({ children }){
    const [ search, setSearch ] = useState([]);

    const Search = {
        Search : () => {return ([search, setSearch ])}
    }

    return(
        <>
            <ContextSearch.Provider value={Search}>
                {children}
            </ContextSearch.Provider>
        </>
    );
}

export default ContextModalSearch;