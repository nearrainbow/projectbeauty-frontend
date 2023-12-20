import './HomeScreen.css'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

// Components
import Product from '../components/Product'
import Navbar from '../components/Navbar'
import SideDrawer from '../components/SideDrawer'
import Backdrop from '../components/Backdrop'
import { Api } from '../utils/Api'

import {
  useParams
} from "react-router-dom";

//Actions
import {getProducts as listProducts} from '../redux/actions/productActions'
import {setUserDeatils} from '../redux/actions/userAction'
import CategoryCard from '../components/CategoryCard'

const HomeScreen = () => {
  const dispatch = useDispatch()

  const [sideToggle, setSideToggle] = useState(false)

  const getProducts = useSelector(state => state.getProducts)
  const {products, loading, error} = getProducts

  const { recommender } = useParams();
  useEffect(() => {
    if(recommender) {
      localStorage.setItem("recommender", recommender)
    }
  },[recommender])
  

  const [categories, setCategories] = useState();
  const [loading2, setLoading] = useState(true);

  useEffect(() => {
    if(!categories) {
      Api.getRequest('/api/category')
        .then(res => {
        const catego = JSON.parse(res.data)
        console.log("category: ", catego)
        setCategories(JSON.parse(res.data));
        setLoading(false);
        
      })
    }
  }, [])

  

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  useEffect(() => {
    dispatch(setUserDeatils())

  }, [dispatch])

  return (
    <>
      <Navbar click={() => setSideToggle(true)} />
      <SideDrawer show={sideToggle} click={() => setSideToggle(false)} />
      <Backdrop show={sideToggle} click={() => setSideToggle(false)} />
      <div className="homescreen">
        <img src="/cover.jpg" className="img_cover" alt="Logo"></img>
        <h2 className="homescreen__title">Category</h2>
        <div className='homescreen__title_after'> </div>
        <div className="homescreen__products">
          {loading2 ? (
            <h2>Loading...</h2>
          ) : error ? (
            <h2>{error}</h2>
          ) : (
            categories.map(category => (
              <CategoryCard
                name={category.name}
                image={category.image}
              />
            ))
          )}
        </div>
        
      </div>
    </>
    
  )
}

export default HomeScreen
