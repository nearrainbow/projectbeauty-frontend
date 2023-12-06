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

import {useDispatch, useSelector} from 'react-redux'

import {getProducts as listProducts} from '../../redux/actions/productActions'

import './AdminScreen.css'

const AdminScreen = () => {

  const [sideToggle, setSideToggle] = useState(false)

  const dispatch = useDispatch()
  const getProducts = useSelector(state => state.getProducts)
  const {products, loading, error} = getProducts

  useEffect(() => {
    dispatch(listProducts())

  }, [dispatch])
  

  return (
    <>
    <Navbar click={() => setSideToggle(true)} />
    <SideDrawer show={sideToggle} click={() => setSideToggle(false)} />
      <Backdrop show={sideToggle} click={() => setSideToggle(false)} />
    {loading ? (
      <h2>Loading...</h2>
    ): 

    <TableContainer component={Paper} className='tablerow'>
      <Table sx={{ minWidth: 200 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              ชื่อและรูป
              </TableCell>
            <TableCell align="left">หมวดหมู่</TableCell>
            <TableCell align="left">คนเข้าชม</TableCell>
            <TableCell align="left">หมวดหมู่</TableCell>
            <TableCell align="left">คำอธิบาย</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <div>
                {row.name}
                </div>
                <img src={row.imageUrl[0]} className='img_div'/>
              </TableCell>
              { row.salePrice == 0 ? (
                <TableCell align="left" className='price'>
                {row.price} บาท 
                </TableCell>) : (
                <TableCell align="left" className='price'>
                  <div className='price_underline'>
                  {row.price} บาท 
                  </div>
                  <div>
                  {row.salePrice} บาท 
                  </div>
                </TableCell>
              )}
              <TableCell align="left" className='price'>
                {row.view}  
                </TableCell>
              <TableCell align="left" className='category' >
              {row.category}
              </TableCell>
              <TableCell align="left" className='description'>
                {row.description.length > 100 ? row.description.slice(0,100)+"...": row.description}
              </TableCell>
              <TableCell align="right" className='action' 
                onClick={() => {
                  window.location.replace('/admin/prodcut_add/'+row._id) 
              }}>
                แก้ไข
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    }
    </>
  );
}

export default AdminScreen