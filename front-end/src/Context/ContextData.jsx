import { createContext, useState } from 'react'

export const ContextCurrent = createContext();

function CurrentContext ({ children }){

    const [currentPeople, setCurrentPeople] = useState({});
    const [enderecos, setEnderecos] = useState([]);
    const [modal, setModal] = useState(false)

    const current = {
        CurrentPeople : () => {return ([currentPeople, setCurrentPeople])},
        CurrentAddresses: () => {return ([enderecos, setEnderecos])},
        Modal: () => {return ([modal, setModal])}
    }

    return(
        <>
            <ContextCurrent.Provider value={current}>
                {children}
            </ContextCurrent.Provider>
        </>
    )
}

export default CurrentContext;