import Sidebar from "../../../components/sidebar/Sidebar";
import TopNav from "../../../components/topNav/topNav";
import ExpenseAnalytics from "./components/analytics/expense";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import './expenses.css'
import { useState } from "react";
import ExpenseTable from "./expenseTable";
import CancelIcon from '@mui/icons-material/Cancel';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ExpenseForm from "./components/ExpenseForm";

const TransactionExpenses = () => {
    const themeColor = process.env.REACT_APP_THEME_COLOR
    const [switchPage, setSwichPage] = useState(false)
    return (
        <>
            <Sidebar />
            <TopNav />

            <div className="dash-viewer">

                <div className='align-content-w-img'>
                    <div className='review-container' >
                        <div style={{ color: themeColor }}>Transactions - Expenses</div>
                        <h1>Expense Report</h1>                            
                        {/* 
                            TEMPORARY DISABLING THE ANALYTICS FOR THIS APPLICATION
                            NOT NEEDED FOR THIS MVP AT THIS TIME. 

                            WILL REINSTATE WHEN NECESSARY
                            */}
                        {/* <div className="expenseAnalytics-container">

                            <ExpenseAnalytics />
                        </div> */}


                        <div className="reportNavigation">
                            <div className="rprt reportTitle">
                                <span></span>
                            </div>
                            <div className="rprt reportActions">
                                <Stack direction="row" spacing={2}>
                                    {
                                        switchPage ?
                                            ""

                                            :
                                            <>
                                                                                        <Button
                                                variant="outlined" s
                                                startIcon={<AddIcon />}
                                                onClick={() => setSwichPage(!switchPage)}
                                                sx={{
                                                    color: "black",
                                                    border: "1px solid black"
                                                }}
                                            >
                                                Create Expense
                                            </Button>
                                            
                                            </>

                                    }

                                </Stack>
                            </div>
                        </div>




                        <div className="exp-data-container">
                            {
                                switchPage ?
                                    <ExpenseForm />
                                    :
                                    <ExpenseTable />
                            }

                        </div>
                    </div>
                    {/* <div className='review-container-2'>
                    <ContractorView />
                </div> */}

                </div>

            </div>
        </>
    )
}

export default TransactionExpenses;