import "./CartScreen.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {useEffect, useState} from 'react';

// Components
import CartItem from "../components/CartItem";

// Actions
import { addToCart, removeFromCart } from "../redux/actions/cartActions";
import useLogin from "../utils/hooks/useLogin";

import Navbar from '../components/Navbar'
import SideDrawer from '../components/SideDrawer'
import Backdrop from '../components/Backdrop'
import {Api} from '../utils/Api'

const CartScreen = () => {

  const cart = useSelector((state) => state.cart);
  // const { loginInfo } = useLogin();
  const [sideToggle, setSideToggle] = useState(false)
  const { cartItems } = cart;
  const [cartItem2, setCartItem] = useState([]);

  useEffect(() => {
    const crt = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    setCartItem(crt);
  },[])

  const qtyChangeHandler = (id, qty) => {

    var index = 0;
    for(var i=0; i<cartItem2.length; i++) {
      if(cartItem2[i]._id == id) index = i;
    }
    cartItem2[index].count = qty;
    setCartItem([...cartItem2]);
    localStorage.setItem("cart", JSON.stringify(cartItem2));
  };

  const removeFromCartHandler = (item) => {

    const crt = cartItem2.filter(value => value._id != item._id);
    localStorage.setItem("cart", JSON.stringify(crt));
    setCartItem(crt);
  };

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const getCartSubTotal = () => {
    return cartItem2
      .reduce((price, item) => price + (item.salePrice == 0?item.price: item.salePrice) * item.count, 0)
      .toFixed(0);
  };

 
  

  

  function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
 }



  const Logistics = [
    'รับของเอง',
    'ຮຸ່ງອາລຸນ',
    'ອານຸສິດ',
    'ມິໄຊ',
    'อื่นๆ'
  ];

  const handleProceedBtn = () => {
    const products = []
    for(var product of cartItem2) {
      products.push({
        name: product.name,
        count: parseInt(product.count),
        imgUrl: product.imageUrl[0]
      })
    }
    const recommender = localStorage.getItem("recommender")
    Api.postRequest('/api/order/addOrder',{
      name,
      tel,
      address,
      products,
      logistic,
      recommender: recommender?recommender: "",
      total: parseInt(getCartSubTotal())
    }).then(res => {
      if(res.statusCode == 200) {
        const data = JSON.parse(res.data);
        const orders_id = localStorage.getItem('orders_id') ? JSON.parse(localStorage.getItem('orders_id')) : [];
        orders_id.push(data._id)
        localStorage.setItem('orders_id', JSON.stringify(orders_id));
        localStorage.removeItem("cart");
        window.location.replace('/orders')
      }
      
    })
    // const name = 
  };

  const [name, setName] = useState();
  const [tel, setTel] = useState();
  const [logistic, setLogistic] = useState(Logistics[0]);
  const [address, setAddress] = useState();

  // if (loginInfo.loading) return <h1>Loading.....</h1>;
  // else if (!loginInfo.loading && loginInfo.isLogin)
    return (
      <>
      <Navbar click={() => setSideToggle(true)} />
      <SideDrawer show={sideToggle} click={() => setSideToggle(false)} />
      <Backdrop show={sideToggle} click={() => setSideToggle(false)} />
        <div className="cartscreen">
          <div className="cartscreen__left">
            <h2>ตะกร้า</h2>

            {cartItem2.length === 0 ? (
              <div>
                Your Cart Is Empty <Link to="/">Go Back</Link>
              </div>
            ) : (
              cartItem2.map((item) => (
                <CartItem
                  // key={item.product}
                  item={item}
                  qtyChangeHandler={qtyChangeHandler}
                  removeHandler={() => removeFromCartHandler(item)}
                />
              ))
            )}
          </div>

          <div className="cartscreen__right">
            <div className="cartscreen__info">
              <div className="checkout_item">
                 ชื่อ:
                <input
                  name="fname"
                  type="text"
                  className='address_text'
                  value={name}
                  onChange={e => setName(e.target.value)}
                  // value={qty}
                  // onChange={e => setQty(e.target.value)}
                  // ref={myinput => (this.input = myinput)}
                />
              </div>
              <div className="checkout_item">
                เบอร์โทร:
                <input
                  name="fname"
                  type="text"
                  className='address_text'
                  value={tel}
                  onChange={e => setTel(e.target.value)}
                  // value={qty}
                  // onChange={e => setQty(e.target.value)}
                  // ref={myinput => (this.input = myinput)}
                />
              </div>
              <div className="checkout_item">
                 ผู้จัดส่ง:
                 <select
                  value={logistic}
                  onChange={(e) => setLogistic(e.target.value)}
                  className="logistic_select"
                >
                  {Logistics.map(element => 
                    <option>
                      {element}
                    </option>
                  )}
                </select>
              </div>
              <div className="checkout_item">
                 ที่อยู่:
                 <input
                  name="fname"
                  type="text"
                  className='address_text'
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  // value={qty}
                  // onChange={e => setQty(e.target.value)}
                  // ref={myinput => (this.input = myinput)}
                />
              </div>
              <div className="checkout_item">
                 ยอดลวม:
                <p>
                 {formatPrice(getCartSubTotal())} บาท
                </p>
              </div>

              {/* <p>${getCartSubTotal()}</p> */}
            </div>
            <div>
              <button className="buy_button"
                title="Functionality need to be add."
                onClick={handleProceedBtn}
              >
                ยืนยันการสั่งชื้อ
              </button>
            </div>
          </div>
        </div>
      </>
    );
};

export default CartScreen;
