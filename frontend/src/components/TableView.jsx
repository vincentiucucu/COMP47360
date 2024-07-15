import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(date, time, unit, vendor, address, EFT) {
  return { date, time, unit, vendor, address, EFT };
}

// const rows = [
//   createData('Tue, 25/06/2024', '11:00 - 15:00', 'AA08267', 'C4049', 'W. Durham Street New York, NY 10027', '4500'),
//   createData('Wed, 26/06/2024', '09:00 - 13:00', 'BB09268', 'C4050', 'E. Grand Street New York, NY 10002', '4800'),
//   createData('Thu, 27/06/2024', '10:00 - 14:00', 'CC10269', 'C4051', 'N. Main Street Brooklyn, NY 11201', '5000'),
//   createData('Fri, 28/06/2024', '08:00 - 12:00', 'DD11270', 'C4052', 'S. Park Avenue Bronx, NY 10451', '4700'),
//   createData('Sat, 29/06/2024', '12:00 - 16:00', 'EE12271', 'C4053', 'W. Market Street Queens, NY 11385', '4900'),
//   createData('Sun, 30/06/2024', '07:00 - 11:00', 'FF13272', 'C4054', 'E. River Street Staten Island, NY 10301', '5200')
// ];

export default function TableView({rows}) {
  return (
    <TableContainer sx={{display:'flex', justifyContent:'center'}} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Time</TableCell>
            <TableCell align="left">Unit</TableCell>
            <TableCell align="left">Vendor</TableCell>
            <TableCell align="left">Address</TableCell>
            <TableCell align="left">EFT</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{row.date}</TableCell>
              <TableCell align="left">{row.time}</TableCell>
              <TableCell align="left">{row.unit}</TableCell>
              <TableCell align="left">{row.vendor}</TableCell>
              <TableCell align="left">{row.address}</TableCell>
              <TableCell align="left">{row.EFT}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
