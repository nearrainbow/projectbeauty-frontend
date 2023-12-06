import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useState, useEffect} from 'react'

import Navbar from '../components/Navbar'
import SideDrawer from '../components/SideDrawer'
import Backdrop from '../components/Backdrop'
import './admin/orderScreen.css'
import {Api} from '../utils/Api'

const OrderHistoryScreen = () => {

  const [sideToggle, setSideToggle] = useState(false)
  const [loading, setLoading] = useState(true)



  const [orders, setOrders] = useState();
  useEffect(() => {
    const orders_id = localStorage.getItem('orders_id') ? JSON.parse(localStorage.getItem('orders_id')) : [];
    Api.postRequest('/api/order/getOrderByIds',{
        ids: orders_id
    }).then(res => {
        setOrders(JSON.parse(res.data))
        setLoading(false)
    })
  },[])

  function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  

  return (
    <>
    <Navbar click={() => setSideToggle(true)} />
    <SideDrawer show={sideToggle} click={() => setSideToggle(false)} />
      <Backdrop show={sideToggle} click={() => setSideToggle(false)} />
    {loading ? (
      <h2>Loading...</h2>
    ): orders && orders.length == 0 ?(
      <h2 className='center'>ยังไม่มีออเดอร</h2>
    ): <div>
        {orders  && orders.map((order) => (
            <div>
            <TableContainer component={Paper} className='tablerow'>
            <Table sx={{ minWidth: 200 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    ชื่อ: {order.name}
                    <br/>
                    เบอร์โทร: {order.tel}
                    <br/>
                    รวม: {formatPrice(order.total)} บาท
                    <br/>
                    วันที่: {order.createdAt.replace("T", " ").replace("Z", " ").slice(0,19)}
                    </TableCell>
                  <TableCell align="left">
                  ขนส่ง: {order.logistic}
                      <br/>
                      
                      <br/>
                      ที่อยู่: {order.address}
                      <br/>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.products.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <div>
                      {row.name}
                      </div>
                      <img src={row.imgUrl} className='img_div'/>
                    </TableCell>
                    <TableCell align="left" className='category' >
                          {row.count} ชิ้น
                    </TableCell>
      
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <br/>
          </div>
        ))}
    </div>
    }
    </>
  );
}

export default OrderHistoryScreen