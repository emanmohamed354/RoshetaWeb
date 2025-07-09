import React , { createContext} from "react";


export let mediaContext=createContext(null)

export default function MediaContextProvider(props){


    


    return <mediaContext.Provider value={{}}>
     {props.children}
    
    </mediaContext.Provider>
}