export const AuthReducer = (state, action) =>{
    switch(action.type){
        case "Landlord":
            return {formHeaderText:"Let's fill out your owners application.", formIdentity: "OW1"}
        case "Tenant":
            return {formHeaderText:"Let's fill out your tenant application.", formIdentity: "TE1"}
        case "LandlordNext":
            return {...state, formHeaderText:"What is your property information?", formState: true}
        default:
            return state
    }
}