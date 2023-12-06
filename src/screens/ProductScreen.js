import './ProductScreen.css'
import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'

// Actions
import {getProductDetails} from '../redux/actions/productActions'
import {addToCart} from '../redux/actions/cartActions'

// # CSS
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";

import Navbar from '../components/Navbar'
import SideDrawer from '../components/SideDrawer'
import Backdrop from '../components/Backdrop'


const ProductScreen = ({match, history}) => {
  const [qty, setQty] = useState(1)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.getProductDetails)
  const {loading, error, product} = productDetails

  const [sideToggle, setSideToggle] = useState(false)


  useEffect(() => {
    if (product && match.params.id !== product._id) {
      dispatch(getProductDetails(match.params.id))
    }
  }, [dispatch, match, product])

  const [img, setImg] = useState([])

  useEffect(() => {
    if(product && Object.keys(product).length !== 0 ) {
      const images2 = [];
      images2.push(
        {
          original: product.imageUrl[0],
          thumbnail: product.imageUrl[0]
        }
      )
      setImg(images2);
    }
    
  }, [product])

  const addToCartHandler = async () => {

    const cp_product = product;
    cp_product.count = qty;

    var cartt = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    if(cartt.length != 0) {
      cartt = cartt.filter((item) => item._id != product._id )
    }
    cartt.push(cp_product);
    localStorage.setItem("cart", JSON.stringify(cartt));
    history.push(`/cart`)
  }  

  return (

    <>
      <Navbar click={() => setSideToggle(true)} />
      <SideDrawer show={sideToggle} click={() => setSideToggle(false)} />
      <Backdrop show={sideToggle} click={() => setSideToggle(false)} />
    <div className="productscreen">
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <>
          <div className="productscreen__left">
            <div className="left__image">
              <ImageGallery 
                items={img} 
                showPlayButton={false}
                showFullscreenButton={false}
              />
            </div>
           
          </div>
          <div className="left__info">
            <p className="left__name">
              {product.name}
              <p className='category_text'>
              หมวดหมู่สินค้า: {product.category}
              </p>
            </p>
            { product.salePrice != 0 ? (
              <>
                <div className='sale_text'><div className='red_line'>{product.price} บาท </div>   ลดทันที {product.price-product.salePrice} บาท </div>
                <div className='price_text'> ราคา: {product.salePrice} บาท</div>
              </>
            ) : <>
              <div className='price_text'> ราคา: {product.price} บาท</div>
            </>
            }
            

            <div className="qty">
              <label className="control-label secondary-text">จำนวน</label>
              <div className='qty_input'>
                <div className='plus_btn' onClick={()=> {
                  if(qty>1)
                  setQty(qty-1)
                }}>
                  -
                </div>
                <input
                  name="fname"
                  type="text"
                  className='qty_textfield'
                  value={qty}
                  onChange={e => setQty(e.target.value)}
                />
                <div className='plus_btn' onClick={()=> setQty(qty+1)}>
                  +
                </div>
              </div>
          </div>

            <div className="info__button" onClick={addToCartHandler}>
                  <i className="fa fa-shopping-cart fa-icon1x"></i> เพิ่มเข้าตะกร้า
            </div>
          <div className='description'>{product.description}</div>
          </div>
        </>
      )}
    </div>
    </>
  )
}

export default ProductScreen
