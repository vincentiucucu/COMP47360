import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'date',
    headerName: 'Date',
    width: 150,
    editable: true,
  },
  {
    field: 'time',
    headerName: 'Time',
    width: 120,
    editable: true,
  },
  {
    field: 'unit',
    headerName: 'Unit',
    width: 90,
    editable: true,
  },
  {
    field: 'vendor',
    headerName: 'Vendor',
    width: 100,
    editable: true,
  },
  {
    field: 'address',
    headerName: 'Address',
    width: 280,
    editable: true,
  },
  {
    field: 'EFT',
    headerName: 'EFT',
    width: 100,
    editable: true,
  },
];

function createData(id, date, time, unit, vendor, address, EFT) {
  return { id, date, time, unit, vendor, address, EFT };
}

const rows = [
  createData(1, 'Tue, 25/06/2024', '11:00 - 15:00', 'AA08267', 'C4049', 'W. Durham Street New York, NY 10027', '4500'),
  createData(2, 'Wed, 26/06/2024', '09:00 - 13:00', 'BB09268', 'C4050', 'E. Grand Street New York, NY 10002', '4800'),
  createData(3, 'Thu, 27/06/2024', '10:00 - 14:00', 'CC10269', 'C4051', 'N. Main Street Brooklyn, NY 11201', '5000'),
  createData(4, 'Fri, 28/06/2024', '08:00 - 12:00', 'DD11270', 'C4052', 'S. Park Avenue Bronx, NY 10451', '4700'),
  createData(5, 'Sat, 29/06/2024', '12:00 - 16:00', 'EE12271', 'C4053', 'W. Market Street Queens, NY 11385', '4900'),
  createData(6, 'Sun, 30/06/2024', '07:00 - 11:00', 'FF13272', 'C4054', 'E. River Street Staten Island, NY 10301', '5200'),
];

export default function DataGridDemo() {
  return (
    <Box sx={{ height: 'auto', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 2,
            },
          },
        }}
        pageSizeOptions={[2]}
        checkboxSelection
        disableRowSelectionOnClick
        autoHeight
      />
    </Box>
  );
}