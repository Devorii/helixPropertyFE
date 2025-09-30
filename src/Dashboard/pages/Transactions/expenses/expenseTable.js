import * as React from 'react';
import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useReportInformation } from '../../../context/reviewReportContext'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import './issues.css'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Select } from '@mui/base/Select';
import { Option } from '@mui/base/Option';
import UnstyledSelectBasic from '../../../components/select/selectExpense';
import dayjs from 'dayjs';
import { parseISO } from 'date-fns';
import dayjsPluginUTC from 'dayjs-plugin-utc'
import { useNavigate } from 'react-router-dom';
 
dayjs.extend(dayjsPluginUTC)

function toTitleCase(str) {
  if (!str) return "N/A";
  return str
    .toLowerCase()
    .replace(/\b\w/g, char => char.toUpperCase());
}

const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so add 1
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};


const formatDate = (e) => {
  if (!e) return null;
  const y = e.$y
  const m = e.$M + 1 < 10 ? `0${e.$M + 1}` : e.$M + 1
  const d = e.$D < 10 ? `0${e.$D}` : e.$D
  return `${y}-${m}-${d}`
}


const columns = [
  { 
    id: 'id', 
    label: 'ID', 
    minWidth: 170 
  },
  {
    id: 'vendor',
    label: 'Vendor',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'category',
    label: 'Category',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'total',
    label: 'Total',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),

  },
  {
    id: 'created_on',
    label: 'Created on',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
];

function createData(id, vendor, category, total, created_on) {
  return { id, vendor, category, total, created_on};
}





const ExpenseTable = () => {
  const navigate = useNavigate()
const [listOfVendors, setListOfVendors] = useState([]);
  const [selectedReport, setSelectedReport] = useState({})
  const [endDate, setEndDate] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [status, setStatus] = useState('')
  // const [updateSelect, setUpdateSelect] = useState(null)
  const [endateMessage, setEndateMessage] = useState(null)
  const [isError, setIsError] = useState(null)
  const [isEndDateError, setIsEndDateError] = useState(null)
  const [nrows, setNRows] = useState([])

  // const [dateValue, _] = React.useState(null)
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { dispatch, state: selectState } = useReportInformation()
  const [mocLs, setMocLs] = useState({
    'id': 'N/A',
    'vendor': 'N/A',
    'category': 'N/A',
    'total': 'N/A',
    'created_on': 'N/A', 
  })
  // let startDate = null
  // let endDate = null
  




useEffect(()=>{
  const token = localStorage.getItem('token')
  const property_id=localStorage.getItem('pid')

  const getCellData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_HELIX_API}/expense/get-expense-reports`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        // body: JSON.stringify({"property_id":property_id})
      });

      // Check if the response status is 200 OK
      if (response.status === 200) {
        const data = await response.json();  // Parse response body as JSON
        // setSelectedReport(...data)

        const reportsDict = data.reduce((acc, item) => {
          acc[item.unique_id] = item;
          return acc;
        }, {});

        setSelectedReport(reportsDict);
        

      const apiResp = data.map(item => ({
        id: item.unique_id?.toString() || "N/A",
        vendor: toTitleCase(item.vendor_id) || "N/A",
        category: item.category_id?.toString() || "N/A",
        total: item.total || "N/A",
        created_on: item.due_date || "N/A",
        }));  
    
        setMocLs(apiResp)
        const updatedRows = apiResp.map((dataSet) =>
          createData(dataSet.id, dataSet.vendor, dataSet.category, dataSet.total, dataSet.created_on)
        );
        setNRows(updatedRows);

        const vendors = ["All",...new Set(apiResp.map(item => toTitleCase(item.vendor)))];
        setListOfVendors(vendors);
      } 

      // Handle other non-200 responses (optional)
      else {
        console.error(`Unexpected status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error during the request:', error.message);
    }
  };

  // Call the async function
  getCellData();
},[])


const clearFliters = () => { 
  setStatus('')
  setNRows(mocLs)
  setStartDate(null)
  setEndDate(null)

}

const applyFilters = (vendorFilter, start, end) => {
  let filtered = mocLs;
  setStatus(toTitleCase(vendorFilter))

// Filter by vendor
  if ((vendorFilter) && (!start && !end) ) {
    filtered = toTitleCase(vendorFilter) ===  "All" ? mocLs : filtered.filter(item => item.vendor === toTitleCase(vendorFilter));
  }
  else if ((vendorFilter) && (start && end) ) {
    filtered =  toTitleCase(vendorFilter) === "All" ? 
                filtered.filter(item => dayjs(item.created_on).isBetween(start, end, null, "[]")) :
                filtered.filter(item => item.vendor === toTitleCase(vendorFilter) && dayjs(item.created_on).isBetween(start, end, null, "[]"));
  }
  // Filter by date range
  else if (start && end) {
    filtered = filtered.filter(item =>
      dayjs(item.created_on).isBetween(start, end, null, "[]")
    );
  }

  setNRows(filtered);
};







const statusChange = (e) => {
  const selectionValue = e?.target?.textContent
  if (selectionValue) {
    const selectedVendor = selectionValue ;
    setStatus(selectedVendor);
    applyFilters(selectedVendor, startDate, endDate);
  }
};

const change = (eventDate) => {
  setEndDate(eventDate);
  applyFilters(status, startDate, eventDate);
};








  const OpenRowInformation = (rowData) => {
    // console.log(JSON.stringify(selectedReport[rowData.id]))
    localStorage.setItem('fncid_set', JSON.stringify(selectedReport[rowData.id]))
    navigate('/expense-view')
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };



  return (
    <>

      <div id='arrangeDateComponents'>
        <div>
          <p>Vendors</p>
          <UnstyledSelectBasic vendorList={listOfVendors} status={status}  updateSelect={(e) => statusChange(e)} />

        </div>
        <div id='mg-15'>
          <p>From</p>
          <DatePicker className='dt-picker' value={startDate} onChange={(e) => {
            setStartDate(dayjs(e.utc()))
          }} />
          {isError ?
            <Stack sx={{ width: '88%' }} spacing={2}>
              <Alert severity='error'>Can't exceed today.</Alert>
            </Stack>
            :
            ''
          }
        </div>
        <div>
          <p>To</p>
          <DatePicker className='dt-picker' value={endDate} onChange={(e) => {
            setEndDate(dayjs(e.utc())) 
            change(dayjs(e.utc()))
          }

          } />
          {isEndDateError ?
            <Stack sx={{ width: '88%' }} spacing={2}>
              <Alert severity='error'>{endateMessage}</Alert>
            </Stack>
            :
            ''
          }
        </div>
        <div className='clearBtnContainer'>
          <button className='clearBtn' onClick={() => clearFliters()}>Clear Filters
            {isError ?
            <Stack sx={{ width: '88%' }} spacing={2}>
              <Alert severity='error'>Can't exceed today.</Alert>
            </Stack>
            :
            ''
          }
          </button>
        </div>
      </div>

      <Paper className='paper' sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 524}}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth:"50px" }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {nrows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow id='rows' onClick={() => OpenRowInformation(row)} hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align} style={{ minWidth:"50px" }} >
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={nrows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        {/* <p>{dateValue}</p> */}
      </Paper>
    </>

  );
}


export default ExpenseTable;