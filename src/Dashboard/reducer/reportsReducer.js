import ReviewTickets from "../components/reviewReports/reviewReports"

export const ReportViewerReducer = (state, action) => {
    switch(action.type){
        case "review":
            return {    
                    isReport: true,
                    data: []
                    }
        case "noReview":
            return {...state, isReport: false}

        default:
            return state
    }
}