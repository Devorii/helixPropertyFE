import { createContext, useReducer, useContext } from "react";
import { issueReportReducer } from "../reducer/issueReport";

const issueInformaiton = createContext()

const initState={
    test:'',
    isForm: false,
    formName: 'Default',
    formStateIssueReport:'Default'
}

export const IssueProvider = ({children}) => { 

const [state, dispatch] = useReducer(issueReportReducer, initState)
return(
    <issueInformaiton.Provider value={{...state, dispatch}}>
        {children}
    </issueInformaiton.Provider>
)

}


export const useIssueInformation = () => { 
    return useContext(issueInformaiton)
}