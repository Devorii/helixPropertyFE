import { createContext, useReducer, useContext } from "react";
import { ReportViewerReducer } from "../reducer/reportsReducer";

const reportInformation = createContext()

const initState={
    data:[],
    isReport: false,

}

export const ReportProvider = ({children}) => { 

const [state, dispatch] = useReducer(ReportViewerReducer, initState)
return(
    <reportInformation.Provider value={{...state, dispatch}}>
        {children}
    </reportInformation.Provider>
)

}


export const useReportInformation = () => { 
    return useContext(reportInformation)
}