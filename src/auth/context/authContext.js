import React, { createContext, useReducer, useContext} from "react";
import { AuthReducer } from "../reducers/auth";


const FormInformation = createContext()

const initstate={
    formHeaderText: null,
    formIdentity: null,
    formState: false
}

export const FormProvider = ({children}) =>{

const [state, dispatch] = useReducer(AuthReducer, initstate)
    return(
        <FormInformation.Provider value={{...state, dispatch}}>
            {children}
        </FormInformation.Provider>
    )
}

export const useFormInformation = () => {
    return useContext(FormInformation)
  }