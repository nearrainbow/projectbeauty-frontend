import './SideDrawer.css'
import {Link, useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {setInitialState} from '../../../redux/actions/userAction'
import {logout} from '../../../utils/localstorage'

const SideDrawer = ({show, click}) => {
  const sideDrawerClass = ['sidedrawer']
  const user = useSelector(state => state.user)
  const history = useHistory()

  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const {cartItems} = cart

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0)
  }

  if (show) {
    sideDrawerClass.push('show')
  }
  const _handleLogout = () => {
    dispatch(setInitialState())
    logout()
    history.push('/')
  }

  return (
    <div className={sideDrawerClass.join(' ')}>
      <ul className="sidedrawer__links" onClick={click}>
        <li className='center'>
        <div className="navbar__logo ">
          {/* <h2>JSOM-E-COMERCE</h2> */}
          <img src="/logo.jpg" className="logo navbar__logo" alt="Logo"></img>
        </div>
        <div className='title'>Project beauty </div>
        </li>

        <li className='nav_title'>
          Page
        </li>
        <div className='nav_title_after'></div>
        <li>
          <Link to="/admin">สินค้าทังหมด</Link>
        </li>
        <div className="line"></div>
        <li>
          <Link to="/admin/prodcut_add">
            เพิ่มสินค้า
          </Link>
        </li>
        <div className="line"></div>
        <li>
          <Link to="/admin/orders">
            ออเดอร์ทังหมด
            
          </Link>
        </li>
        <div className="line"></div>
        <li>
          <Link to="/admin/record">
            ยอดผู้เข้าชม
          </Link>
        </li>
        <div className="line"></div>
        <li>
          <div className='text_div' onClick={_handleLogout}>
            ออกจากละบบ
          </div>
        </li>
        <div className="line"></div>
      </ul>
    </div>
  )
}

export default SideDrawer
