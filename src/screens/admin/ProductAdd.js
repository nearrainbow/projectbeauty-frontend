import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

import {useState, useEffect, useCallback, useMemo} from 'react'

import Navbar from './components/navbar';
import SideDrawer from './components/SideDrawer'
import Backdrop from '../../components/Backdrop'

import {useDispatch} from 'react-redux'

import {getProducts as listProducts} from '../../redux/actions/productActions'

import './ProductAdd.css'
import {Api} from '../../utils/Api'
import { config } from '../../utils/config';

import {
  useParams
} from "react-router-dom";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';


const ProductAdd = () => {

  const [sideToggle, setSideToggle] = useState(false)

  const dispatch = useDispatch()
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState();
  const [product, setProduct] = useState();
  const { id } = useParams();

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  const [categories, setCategories] = useState();
  useEffect(() => {
    if(!categories) {
      Api.getRequest('/api/category')
        .then(res => {
        const catego = JSON.parse(res.data)
        setCategories(
          catego.map((cat) => cat.name)
        );
      })
    }
    if(id) {
      Api.getRequest(`/api/products/${id}`)
        .then(res => {
        const product = JSON.parse(res.data)
        setName(product.name)
        setPrice(product.price)
        setSalePrice(product.salePrice)
        setCategory(product.category)
        setDescription(product.description)
        setImageUrl(product.imageUrl)
      })
    }
  }, [])

  const [imageUrl, setImageUrl] = useState([])

  function handleChangeFile(e)  {

    const formData = new FormData();
    formData.append("files", e.target.files[0]);
    fetch(config.baseURL + 'api/upload_image', {
      method: 'POST',
      body: formData, // Payload is formData object
    })
    .then(res => res.json())
    .then(data => { 
      const ulr = config.baseURL + data.path;
      setImageUrl(oldArray => [ulr,...oldArray])
    });

  }

  const _handleSubmit = useCallback(async () => {
    Api.postRequest('/api/products/addProduct', {
        _id: id,
        name,
        price,
        salePrice,
        category,
        description,
        imageUrl
    }).then(res => {
      window.location.replace('/admin')
    })
  }, [name ,price, salePrice, category, description, imageUrl])

  const deleteClick = () => {
    Api.postRequest('/api/products/deleteProduct', {
      _id: id,
    }).then(res => {
      window.location.replace('/admin')
    })
  }

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  

  return (
    <>
    <Navbar click={() => setSideToggle(true)} />
    <SideDrawer show={sideToggle} click={() => setSideToggle(false)} />
      <Backdrop show={sideToggle} click={() => setSideToggle(false)} />

      <div className='body_container'>
      <TextField 
        id="outlined-basic" 
        className='input_container' 
        label="ชื่อสินค้า" 
        variant="outlined" 
        margin="dense"
        InputLabelProps={{
        shrink: true,
        }}
        value={name}
        onChange={e => setName(e.target.value)}
        />
      <TextField
          id="outlined-number"
          label="ราคา"
          type="number"
          className='input_container' 
          margin="dense"
          InputLabelProps={{
            shrink: true,
          }}
          value={price}
          onChange={e => {
            setPrice(e.target.value)
          }
            
          }
        />
        <TextField
          id="outlined-number"
          label="ราคาโปรโมชั่น"
          type="number"
          className='input_container' 
          margin="dense"
          InputLabelProps={{
            shrink: true,
          }}
          value={salePrice}
          onChange={e => setSalePrice(e.target.value)}
        />

        <FormControl sx={{ mt: 1, minWidth: 150 }} className='input_container'>
        <InputLabel id="demo-simple-select-autowidth-label">หมวดหมู่</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={category}
          onChange={e => setCategory(e.target.value)}
          autoWidth
          label="Age"
        >
          { categories && categories.map((cat) => (
            <MenuItem value={cat}>{cat}</MenuItem>
          ))}
        </Select>
        
      </FormControl>

      <TextField
        sx={{ mt: 2}}
          className='input_container'
          id="outlined-multiline-static"
          label="คำอธิบาย"
          multiline
          rows={8}
          value={description}
          onChange={e => setDescription(e.target.value)}
     />

     <div>
        รูป
     </div>
      <input type="file" onChange={handleChangeFile} />
      
      {imageUrl.length !=0 && imageUrl.map((item) => (
        <a>
        <img
            // srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${item}?w=164&h=164&fit=crop&auto=format`}
            // loading="lazy"
          />
          <span 
            className="icon" 
            onClick={() => {
              setImageUrl(oldArray => [...oldArray.filter(value => value !== item)]);
          }}>x</span>
          </a>
      ))}
      <img src={file} />
      <div className='add_button' onClick={_handleSubmit}>
        เพิ่มสินค้า
      </div>
      { id && (
        <div className='delete_button' onClick={handleClickOpen}>
        ลบ
      </div>
      )}
      
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"ยืนยัน"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            กรุณายืนยันการลบสินค้า
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>ยกเลิก</Button>
          <Button onClick={deleteClick} autoFocus>
            ยืนยัน
          </Button>
        </DialogActions>
      </Dialog>
  
    </>
  );
}

export default ProductAdd