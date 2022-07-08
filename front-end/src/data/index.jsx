import {useState} from 'react';

export function usePeople (){
    const [currentUser, setCurrentUser] = useState({})

    return ({
        People: () => {return ({currentUser, setCurrentUser})}
    });
}