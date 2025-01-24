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
import { useReportInformation } from '../../context/reviewReportContext';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import './issues.css'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Select } from '@mui/base/Select';
import { Option } from '@mui/base/Option';
import UnstyledSelectBasic from '../select/select';



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
  { id: 'id', label: 'ID', minWidth: 170 },
  { id: 'issue', label: 'Issue', minWidth: 100 },
  {
    id: 'date',
    label: 'Date',
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
    id: 'status',
    label: 'Status',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'created_by',
    label: 'Created by',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
];

function createData(id, issue, date, category, status, created_by, description) {
  return { id, issue, date, category, status, created_by, description };
}





const StickyHeadTable = () => {
  const [endDate, setEndDate] = useState(null)
  const [updateSelect, setUpdateSelect] = useState(null)
  const [endateMessage, setEndateMessage] = useState(null)
  const [isError, setIsError] = useState(null)
  const [isEndDateError, setIsEndDateError] = useState(null)
  const [nrows, setNRows] = useState([])
  const [startDate, setStartDate] = useState(null)
  const [dateValue, _] = React.useState(null)
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { dispatch } = useReportInformation()
  const [mocLs, setMocLs] = useState({
    'id': 'N/A',
    'issue': 'N/A',
    'date': 'N/A',
    'category': 'N/A',
    'status': 'N/A', 
    'created_by':'N/A'
  })



useEffect(()=>{
  const token = localStorage.getItem('token')
  const property_id=localStorage.getItem('pid')

  const getCellData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_HELIX_API}/support/all-tickets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        body: JSON.stringify({"property_id":property_id})
      });

      // Check if the response status is 200 OK
      if (response.status === 200) {
        const data = await response.json();  // Parse response body as JSON
        const apiResp  = data.map(item => ({
          id: item.ticket_num.toString() || "N/A",               // Convert id to string
          issue: item.title || "N/A",                    // Rename 'title' to 'issue'
          date: item.created_date || "N/A",     // Use created_date, default to "N/A" if null
          category: item.category || "N/A",              // Keep category as is
          status: item.status || "N/A",                  // Keep status as is
          created_by: item.author.toLowerCase() || "N/A", // Normalize 'author' to lowercase for 'created_by'
          description: item.description || "N/A"
        }));
        setMocLs(apiResp)
        const updatedRows = apiResp.map((dataSet) =>
          createData(dataSet.id, dataSet.issue, dataSet.date, dataSet.category, dataSet.status, dataSet.created_by, dataSet.description)
        );
        setNRows(updatedRows);


        console.log("Response Data:", data);  // Process the data as needed
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

  if (updateSelect == 'All' && startDate != null && endDate != null) {
    let setFilteresData = mocLs.filter(items => (items.date >= startDate) && (items.date <= endDate))
    setNRows(setFilteresData)
  } else if (updateSelect == 'All' && startDate == null && endDate == null) {
    setNRows(mocLs)
  }

},[updateSelect])


  // useEffect(() => {
  //   // if((updateSelect == 'All') && (startDate == null || endDate == null)){
  //   //   window.location.reload()
  //   // }


  // }, )

  const change = (start, e) => {
    /**
     * Manages the state ouf our filters;
     * From & to dates and status selection.
     * @params @int start.
     * @params @event e --> captured event.
     */

    // Change Global Variable
    const date = formatDate(e)
    let filteredData;


    // Checks conditions are met for selection even
    if (![null, 1].includes(start)) {
      const selectValue = e.target.innerHTML;
      setUpdateSelect(selectValue)

      // Need to check if end date have been captured.
      // console.log(`Select Value -> ${selectValue} | Start Date -> ${startDate} | End Date -> ${endDate}`

      if ((!endDate) || (!startDate) && selectValue != 'All') {
        filteredData = mocLs.filter(items => items.status == selectValue);
      }
      if ((endDate) || (startDate) && selectValue != 'All') {
        filteredData = mocLs.filter(items => (items.date >= startDate) && (items.date <= date) && (items.status == selectValue));
      }
      setNRows(filteredData)
    }

    // validates start date aka From is selected.
    else if (![null, 2].includes(start)) {
      if ((endDate)) {
        filteredData = mocLs.filter(items => (items.date >= date) && (items.date <= endDate))
        setNRows(filteredData)
      }
      setIsError(false)
      setStartDate(date)
    }

    // Triggeres end date filtration.
    else {
      if (!updateSelect) {
        filteredData = mocLs.filter(items => (items.date >= startDate) && (items.date <= date));
      } else {
        filteredData = mocLs.filter(items => (items.date >= startDate) && (items.date <= date) && (items.status == updateSelect));
      }

      setIsEndDateError(false)
      setNRows(filteredData)
    }

  }

  const OpenRowInformation = (cellData) => {
    dispatch({ type: 'review' })
    localStorage.setItem('cellData', cellData)
    // Instead of passing data through context. 
    // You can pass it through local storage.
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

console.log(mocLs)
  return (
    <>
      <p className='dt-picker-tag'>View reports</p>
      <div id='arrangeDateComponents'>
        <div>
          <p>Status</p>
          <UnstyledSelectBasic updateSelect={(e) => change(2, e)} />
        </div>
        <div id='mg-15'>
          <p>From</p>
          <DatePicker className='dt-picker' value={dateValue} onChange={(e) => {
            const pickedDate = formatDate(e)
            if (pickedDate > getCurrentDate()) {
              setIsError(true)
            }
            else {
              change(1, e)
            }


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
          <DatePicker className='dt-picker' value={dateValue} onChange={(e) => {
            const pickedDate = formatDate(e)
            if (pickedDate < startDate) {
              setIsEndDateError(true)
              setEndateMessage("From date can't be greater than To.")
            }
            else if (!startDate) {
              setIsEndDateError(true)
              setEndateMessage("Set a from date.")
            }
            else {
              setEndDate(pickedDate)
              change(null, e)
            }
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
      </div>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
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
                    <TableRow id='rows' onClick={() => OpenRowInformation(JSON.stringify(row))} hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
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


export default StickyHeadTable;