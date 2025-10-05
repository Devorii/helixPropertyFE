import "./expenseView.css"
import Sidebar from "../../../components/sidebar/Sidebar";
import TopNav from "../../../components/topNav/topNav";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";

// Table imports
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteDialog from '../../../../Dashboard/components/areYouSureModal/rusure'




const ExpenseViewer = () => {
    const [report, setReport] = useState({
        amount_due: '0',
        bill_num: '0',
        category_id: 'None',
        currency: 'None',
        due_date: '1903-01-01',
        expense_id: 0,
        items: [{
            amount: '0',
            description: 'No description',
            item: 'None',
            items_id: 0,
            price: '0',
            quatity: 0,
            report_id: '0'
        }],
        po_so: '0',
        subtotal: '0',
        tax: '0',
        total: '0',
        total_paid: '0',
        unique_id: '0',
        unit_id: '0',
        vendor_id: '0'
    })
    const navigate = useNavigate()
    const themeColor = process.env.REACT_APP_THEME_COLOR

    // Table content
    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
    ];



    useEffect(() => {
        const report_code = localStorage.getItem('fncid_set')

        if (!report_code) {
            navigate('/transaction-expenses')
        }
        else {
            const parsed_report_code = JSON.parse(report_code)
            setReport(parsed_report_code)

        }



    }, [])



    return (
        <>
            <Sidebar />
            <TopNav />


            <div className="dash-viewer">

                <div className='align-content-w-img'>
                    <div className='review-container' >
                        <div style={{ color: themeColor }}>Transactions - {report.category_id} Expense</div>
                        <h1>Expense Report</h1>
                        <div className="reportNavigation">
                            <div className="rprt reportTitle">
                                <span></span>
                            </div>
                            <div className="rprt reportActions rmv-mbl">
                                <Stack direction="row" spacing={2}>
                                    <Button
                                        variant="contained"
                                        onClick={()=>navigate('/transaction-expenses')}
                                        sx={{
                                            border: '1px solid black',
                                            backgroundColor: 'white',
                                            color: 'black',
                                            '&:hover': { backgroundColor: '#fff8f5ff' },
                                        }}
                                    >
                                        Back
                                    </Button>
                                    <DeleteDialog />
                                </Stack>
                            </div>
                        </div>

                        {/* HEADER INFO */}
                        <div className="header-info">
                            {/* 
                            LEFT HEADER INFORMATION
                            */}
                            <div className="left-header-info">
                                <div>
                                    <h4 id="totalExpenseTitle" style={{ color: themeColor }}>Total Expense</h4>
                                    <span style={{ color: themeColor }} className="totalAmount">${report.total}</span>
                                </div>

                                <div className="totalamount-header">
                                    <div>
                                        <h4>Cost</h4>
                                        <span className="">${report.total}</span>
                                    </div>
                                    <div className="payment-header">
                                        <h4>Tax</h4>
                                        <span className="">{report.tax}%</span>
                                    </div>
                                    <div className="payment-header">
                                        <h4>Paid</h4>
                                        <span className="">${report.total_paid}</span>
                                    </div>
                                </div>

                            </div>


                            {/* 
                        RIGHT HEADER INFORMATION
                        */}
                            <div className="right-header-info">
                                <h4 id="billingInfoTitle" style={{ color: themeColor }}>Billing Info</h4>
                                <div className="vendorInfo">

                                    <span>{report.vendor_id}</span>
                                    <span>{report.vendor_street_addess} {report.vendor_city}</span>
                                    <span>{report.vendor_province} {report.vendor_country}, {report.vendor_postal_code}</span>
                                    <span></span>
                                    <span id="make_call" onClick={() => (window.location.href = `tel:${report.vendor_phone}`)}>+1 {report.vendor_phone}</span>

                                </div>


                            </div>



                        </div>
                        {/* END OF HEADER INFO */}

                        <hr style={{ marginTop: "50px", marginBottom: "50px" }} />

                        {/* List of all the items in the expense */}
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="caption table">
                                <caption>Receipts are stored until deleted.</caption>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>items</TableCell>
                                        <TableCell align="right">descriptions</TableCell>
                                        <TableCell align="right">quatity</TableCell>
                                        <TableCell align="right">price</TableCell>
                                        <TableCell align="right">amount</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {report.items.map((row) => (
                                        <TableRow key={row.report_id}>
                                            <TableCell component="th" scope="row">
                                                {row.item}
                                            </TableCell>
                                            <TableCell align="right">{row.description}</TableCell>
                                            <TableCell align="right">{row.quantity}</TableCell>
                                            <TableCell align="right">${row.price}</TableCell>
                                            <TableCell align="right">${row.amount}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </div>
                </div>

                                            <div className="rprt reportActions kp-mbl">
                                <Stack style={{width: "100%", display: "flex", justifyContent: "space-between"}} direction="row" spacing={2}>
                                    <Button
                                        className="img-btn"
                                        variant="contained"
                                        onClick={()=>navigate('/transaction-expenses')}
                                        sx={{
                                            // border: '1px solid black',
                                            backgroundColor: 'rgb(180 82 82)',
                                            color: 'white',
                                            
                                        }}
                                    >
                                        Back
                                    </Button>
                                    <DeleteDialog />

                                </Stack>
                            </div>
            </div>
        </>
    )
}

export default ExpenseViewer;