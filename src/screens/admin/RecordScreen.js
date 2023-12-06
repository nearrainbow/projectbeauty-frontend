import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useState, useEffect} from 'react'

import Navbar from './components/navbar';
import SideDrawer from './components/SideDrawer'
import Backdrop from '../../components/Backdrop'
import './RecordScreen.css'
import {Api} from '../../utils/Api'
import { BarChart } from '@mui/x-charts/BarChart';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const RecordScreen = () => {

  const [sideToggle, setSideToggle] = useState(false)
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState();

  const [views, setViews] = useState();
  const [date, setDate] = useState();
  const [allTimeView, setAllTimeView] = useState();
    

  useEffect(() => {
    Api.getRequest('/api/viewlog/get30daysView').then(res => {
        const data = JSON.parse(res.data);
        setDate(data.date)
        setViews(data.views)
        setAllTimeView(data.allTimeView)
        setLoading(false)
    })
  },[])

  function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );
  

  return (
    <>
    <Navbar click={() => setSideToggle(true)} />
    <SideDrawer show={sideToggle} click={() => setSideToggle(false)} />
      <Backdrop show={sideToggle} click={() => setSideToggle(false)} />
    {loading ? (
      <h2>Loading...</h2>
    )  :<div>
        <Card sx={{ minWidth: 275 , maxWidth: 360}} className='center'>
        <CardContent>
            <h2>
                ยอดผู้เข้าชมทังหมด
            </h2>
            <h1>
                {allTimeView} ครั้ง
            </h1>
        </CardContent>
        </Card>
        <br/>
        <br/>
        <div className='center'>
            ยอดผู้เข้าชม 7 วัน
        <BarChart
            xAxis={[{ scaleType: 'band', data: date.slice(-7) }]}
            series={[{ data: views.slice(-7) }]}
            // width={400}
            height={300}
        />
        </div>

        <br/>
        <br/>
        <div className='center margin_auto'>
            ยอดผู้เข้าชม 30 วัน
        <BarChart
            xAxis={[{ scaleType: 'band', data: date }]}
            series={[{ data: views }]}
            // width={400}
            height={300}
        />
        </div>
    </div>
    }
    </>
  );
}

export default RecordScreen