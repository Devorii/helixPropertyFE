import ComplaintForm from "../components/complaintForm/complaint-form"

export const issueReportReducer = (state, action) => {

    const ls_main_floor = [
        { value: 'kn', label: 'Kitchen' },
        { value: 'bthr', label: 'Bathroom'},
        { value: 'br', label: 'Bedroom'},
        { value: 'mbr', label: 'Master Bedroom'},
        { value: 'hw', label: 'Hallway'},
        { value: 'atk', label: 'Attic' },
        { value: 'gr', label: 'Garage' },
      ];

      const ls_outdoor = [
        { value: 'blc', label: 'Balcony' },
        { value: 'bky', label: 'Backyard' },
        { value: 'rf', label: 'Roof' },
        { value: 'dk', label: 'Deck' },
        { value: 'ln', label: 'Lawn' },
        { value: 'dgrg', label: 'Detach Garage' },
        { value: 'dw', label: 'Driveway' },
      ];

      const ls_basement = [
        { value: 'bkn', label: 'Kitchen' },
        { value: 'bbthr', label: 'Bathroom'},
        { value: 'bbr', label: 'Bedroom'},
        { value: 'bmbr', label: 'Master Bedroom'},
        { value: 'bhw', label: 'Hallway'},

      ];



    switch(action.type){
        case "Main Unit":
            return {    
                    test: <ComplaintForm lsOfCategories={ls_main_floor} />,
                    isForm: true,
                    formName: 'Main Unit',
                    formStateIssueReport:'Default'
                    }
        case "Outdoor":
            return {    
                    test: <ComplaintForm lsOfCategories={ls_outdoor} />,
                    isForm: true,
                    formName: 'Outdoor',
                    formStateIssueReport:'Default'
                    }
        case "Basement":
            return {    
                    test: <ComplaintForm lsOfCategories={ls_basement}  />,
                    isForm: true,
                    formName: 'Basement',
                    formStateIssueReport:'Default'
                    }

        case 'viewReports':
            return {
                    ...state,
                    isForm: false 
                    }

        default:
            return state
    }
}