import './SideDrawer.css'
import {Link, useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {setInitialState} from '../redux/actions/userAction'
import {logout, dailyCheckIn} from '../utils/localstorage'
import {useState, useEffect} from 'react'
import {Api} from '../utils/Api'

const SideDrawer = ({show, click}) => {
  const sideDrawerClass = ['sidedrawer']
  const user = useSelector(state => state.user)
  const history = useHistory()

  const dispatch = useDispatch()

  

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

    dailyCheckIn();

  }, [])

  
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
          <Link to="/">หน้าแรก</Link>
        </li>
        <div className="line"></div>

        <li>
          <Link to="/cart">
            <span>
            ตะกร้าสินค้า
              {/* <span className="sidedrawer__cartbadge">{getCartCount()}</span> */}
            </span>
            
          </Link>
        </li>
        <div className="line"></div>
        <li>
          <Link to="/orders">
            <span>
            ออเดอร์
              {/* <span className="sidedrawer__cartbadge">{getCartCount()}</span> */}
            </span>
            
          </Link>
        </li>
        <div className="line"></div>
{/* 
        {!user.userInfo.isLogin ? (
          <li>
            <Link to="/signin">เข้าสู่ระบบ</Link>
          </li>
        ) : (
          <li>
            <div className='text_link' onClick={_handleLogout}>ออกจากละบบ</div>
          </li>
        )} */}
        <div className="line"></div>


        <li className='nav_title'>
          Category
        </li>
        <div className='nav_title_after'></div>
        { categories && categories.map(category => (
          <>
            <li>
              <Link  Link to={`/category/${category}`}>{category}</Link>
            </li>
            <div className="line"></div>
          </>
        ))}
        <br/>
        <br/>
        <br/>
        <br/>
        

      </ul>
    </div>
  )
}

export default SideDrawer
