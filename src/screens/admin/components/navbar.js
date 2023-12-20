import './navbar.css'
import {Link, useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {logout} from '../../../utils/localstorage'
import {setInitialState} from '../../../redux/actions/userAction'
import {useState, useEffect} from 'react'
import { isLogin } from '../../../utils/localstorage'

const Navbar = ({click}) => {
  const history = useHistory()
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(()=> {
    
    if(user.userInfo.details.role && user.userInfo.details.role !=2) {
      // window.location.replace("/")
    }
    if(!isLogin()) {
      window.location.replace("/signin")
    }
  },[user])

  return (
    <>
      <div className='bar_container'>
      <div className="bar">
      <div className="socials_bar">
        <div className="facebook"><a href="https://www.facebook.com/sanhtisikhod" target="_blank"><i className="fa fa-facebook"></i></a></div>
      </div>
      </div>
      </div>
      <nav className="navbar" >
        <a href="/">
        <div className="navbar__logo">
          <img src="/logo.jpg" className="logo navbar__logo" alt="Logo"></img>
        </div>
        </a>
        <div className='title'>Project beauty </div>

        {/* <ul className="navbar__links">
          <li>
            <Link to="/cart" className="cart__link">
              <i className="fas fa-shopping-cart"></i>
              <span>
                Cart <span className="cartlogo__badge">{getCartCount()}</span>
              </span>
            </Link>
          </li>

          <li>
            <Link to="/">Shop</Link>
          </li>

          {!user.userInfo.isLogin ? (
            <li>
              <Link to="/signin">Login</Link>
            </li>
          ) : (
            <li>
              <p onClick={_handleLogout}>Logout</p>
            </li>
          )}
        </ul> */}

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
