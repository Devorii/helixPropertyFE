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
import dayjs from 'dayjs';
import { parseISO } from 'date-fns';
import dayjsPluginUTC from 'dayjs-plugin-utc'
 
dayjs.extend(dayjsPluginUTC)



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

function createData(id, issue, date, category, status, created_by, description, images) {
  return { id, issue, date, category, status, created_by, description, images };
}





const StickyHeadTable = () => {
  const [endDate, setEndDate] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [status, setStatus] = useState('All')
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
    'issue': 'N/A',
    'date': 'N/A',
    'category': 'N/A',
    'status': 'N/A', 
    'created_by':'N/A', 
  })
  // let startDate = null
  // let endDate = null





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
          description: item.description || "N/A", 
          images: item.images || "N/A"
        }));
        setMocLs(apiResp)
        const updatedRows = apiResp.map((dataSet) =>
          createData(dataSet.id, dataSet.issue, dataSet.date, dataSet.category, dataSet.status, dataSet.created_by, dataSet.description, dataSet.images)
        );
        setNRows(updatedRows);
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



const statusChange = (e) =>{
  let data = null
  if (e?.target?.textContent === 'All' ||
    e?.target?.textContent === 'Open' ||
    e?.target?.textContent === 'Processing' ||
    e?.target?.textContent === 'Reviewing' ||
    e?.target?.textContent === 'Closed') {
      setStatus(e.target.textContent)

  if (!startDate && !endDate){
    data =  e.target.textContent === 'All' ?  mocLs : mocLs.filter(items => (items.status === e.target.textContent))
  }
  else if((startDate, endDate) && e?.target?.textContent === 'All'){
    data = mocLs.filter(items => (dayjs(items.date).isBetween(startDate, endDate)))
  }
  else{
    data = mocLs.filter(items => (items.status === e.target.textContent) && (dayjs(items.date).isBetween(startDate, endDate)))
  }

     setNRows(data)
  }
}

  
  const change = (eventDate) => {
    let filteredData=null
    if (startDate && status !== "All") {
      console.log(status,'status no ALL')
        filteredData = mocLs.filter(items => (dayjs(items.date).isBetween(startDate, eventDate)) && (items.status==status));
      }
      else if(startDate && status === "All"){
        console.log(status,'status ALL')
        filteredData = mocLs.filter(items => dayjs(items.date).isBetween(startDate, eventDate));
      }
      setNRows(filteredData)
  }








  const OpenRowInformation = (cellData) => {
    dispatch({ type: 'review' })
    localStorage.setItem('cellData', cellData)
 
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
      <p className='dt-picker-tag'>View reports</p>
      <div id='arrangeDateComponents'>
        <div>
          <p>Status</p>
          <UnstyledSelectBasic updateSelect={(e) => statusChange(e)} />

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
                    <TableRow id='rows' onClick={() => OpenRowInformation(JSON.stringify(row))} hover role="checkbox" tabIndex={-1} key={row.code}>
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


export default StickyHeadTable;