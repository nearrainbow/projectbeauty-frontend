import './App.css'
import {useEffect, useState} from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SideDrawer from './components/SideDrawer'
import Backdrop from './components/Backdrop'

// Screens
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import CategoryScreen from './screens/Category'
import SignUp from './screens/SignUp'
import SignIn from './screens/SignIn'
import AdminScreen from './screens/admin/AdminScreen'
import ProductAdd from './screens/admin/ProductAdd'
import OrderScreen from './screens/admin/orderScreen'

import {useDispatch} from 'react-redux'
import {fetchCart} from './redux/actions/cartActions'
import {setUserDeatils} from './redux/actions/userAction'
import OrderHistoryScreen from './screens/OrderHistoryScreen'
import RecordScreen from './screens/admin/RecordScreen'



function App() {
  const [sideToggle, setSideToggle] = useState(false)
  // fetchCart
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCart())
    dispatch(setUserDeatils())
  }, [dispatch])

  return (
    <Router>
      {/* <Navbar click={() => setSideToggle(true)} />
      <SideDrawer show={sideToggle} click={() => setSideToggle(false)} />
      <Backdrop show={sideToggle} click={() => setSideToggle(false)} /> */}

      <main className="app">
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          
          <Route exact path="/product/:id" component={ProductScreen} />
          <Route exact path="/cart" component={CartScreen} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/orders" component={OrderHistoryScreen} />
          <Route exact path="/category/:category" component={CategoryScreen} />
          <Route exact path="/admin" component={AdminScreen} />
          <Route exact path="/admin/prodcut_add" component={ProductAdd} />
          <Route exact path="/admin/prodcut_add/:id" component={ProductAdd} />
          <Route exact path="/admin/record" component={RecordScreen} />
          <Route exact path="/admin/orders" component={OrderScreen} />

          {/* <Route exact path="/:recommender" component={HomeScreen} /> */}
          
        </Switch>
        <Footer/>
      </main>
      
    </Router>
  )
}

export default App
