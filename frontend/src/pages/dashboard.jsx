import React from 'react';
import { Box, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import AppBar from '../components/HamburgerBox';

const data = [
  { name: '01/06', revenue: 600 },
  { name: '02/06', revenue: 800 },
  { name: '03/06', revenue: 1000 },
  { name: '04/06', revenue: 400 },
  { name: '05/06', revenue: 500 },
  { name: '06/06', revenue: 700 },
  { name: '07/06', revenue: 800 }
];

const tableData = [
  { date: '25/06/2024', time: '11:00 - 15:00', unit: 'AA08267', vendor: 'C4049', address: 'W. Durham Street New York, NY 10027', eft: 4000 },
  { date: '25/06/2024', time: '18:00 - 21:00', unit: 'AA09473', vendor: 'C4078', address: 'Riverview St. Levittown, NY 11756', eft: 6237 },
  { date: '27/06/2024', time: '06:30 - 10:30', unit: 'AA08267', vendor: 'C4049', address: 'North Coffee Court New York, NY 10028', eft: 3843 },
  { date: '27/06/2024', time: '15:30 - 21:00', unit: 'AA09473', vendor: 'C4078', address: 'Riverview St. Levittown, NY 11756', eft: 5297 }
];

const Dashboard = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 3, }}>
      <AppBar />
      <Grid sx={{mt: "30px"}} container spacing={2}>
        <Grid item xs={12} md={4}>
          <Box sx={{ backgroundColor: 'lightgrey', padding: 2, borderRadius: 1, mb: 2 }}>
            <Typography variant="h6">Total Revenue</Typography>
            <Typography variant="h4">$6354.73</Typography>
          </Box>
          <Box sx={{ backgroundColor: 'lightgrey', padding: 2, borderRadius: 1, mb: 2 }}>
            <Typography variant="h6">Best Performing Unit</Typography>
            <Typography variant="h5">AA08267</Typography>
          </Box>
          <Box sx={{ backgroundColor: 'lightgrey', padding: 2, borderRadius: 1 }}>
            <Typography variant="h6">Best Performing Vendor</Typography>
            <Typography variant="h5">C4049</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ backgroundColor: 'lightgrey', padding: 2, borderRadius: 1, mb: 2 }}>
            <Typography variant="h6">Most Profitable Location</Typography>
            <Typography variant="h5">W. Durham Street New York, NY 10027</Typography>
          </Box>
          <MapContainer center={[40.7128, -74.0060]} zoom={10} style={{ height: '300px', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[40.8128, -73.9560]}>
              <Popup>
                W. Durham Street New York, NY 10027
              </Popup>
            </Marker>
          </MapContainer>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ backgroundColor: 'lightgrey', padding: 2, borderRadius: 1 }}>
            <Typography variant="h6">Revenue Growth</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Unit</TableCell>
                  <TableCell>Vendor</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>EFT</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.time}</TableCell>
                    <TableCell>{row.unit}</TableCell>
                    <TableCell>{row.vendor}</TableCell>
                    <TableCell>{row.address}</TableCell>
                    <TableCell>{row.eft}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
