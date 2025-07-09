import { createContext } from "react";

export let mediaContext=createContext()


export default function mediaContextProvider(props){

    <mediaContext.Provider value={{}}>
        {props.children}
    </mediaContext.Provider>


}

