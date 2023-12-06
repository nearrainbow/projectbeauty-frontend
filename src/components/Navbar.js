import './Navbar.css'
import {Link, useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {useMemo} from 'react'
import {logout} from '../utils/localstorage'
import {setInitialState} from '../redux/actions/userAction'

const Navbar = ({click}) => {
  const cart = useSelector(state => state.cart)
  const history = useHistory()
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()


  const {cartItems} = cart

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0)
  }

  const _handleLogout = () => {

    dispatch(setInitialState())
    logout()
    history.push('/')
  }

  return (
    <>
      <div className='bar_container'>
      <div className="bar">
      <div className="socials_bar">
        <div className="facebook"><a href="https://www.facebook.com/sanhtisikhod" target="_blank"><i className="fa fa-facebook"></i></a></div>
      </div>
      </div>
      </div>

      <div className="float-right">
      {/* <div className="facebook"><a href="https://www.facebook.com/sanhtisikhod" target="_blank"><i className="fa fa-facebook"></i></a></div> */}
      {/* {!user.userInfo.isLogin && (
        <>
          <div className=""><a href="/signin"><i className="fa fa-lock"></i><span>  เข้าสู่ระบบ</span></a></div>
				<div className=""><a href="/signup"><i className="fa fa-user-plus"></i><span>  สมัครสมาชิก</span></a></div>
        </>
      )} */}
        <div className=""><a href="/cart"><i className="fa fa-shopping-cart"></i><span>   ตะกร้าสินค้า</span></a></div>
      </div>
      
      <nav className="navbar" >
        <a href="/">
        <div className="navbar__logo">
          <img src="/logo.jpg" className="logo navbar__logo" alt="Logo"></img>
        </div>
        </a>
        <div className='title'>Project beauty </div>

        <div className="hamburger__menu" onClick={click}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
