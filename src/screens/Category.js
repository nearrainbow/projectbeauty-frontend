import './Category.css'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

// Components
import Product from '../components/Product'
import Navbar from '../components/Navbar'
import SideDrawer from '../components/SideDrawer'
import Backdrop from '../components/Backdrop'

import {
  useParams
} from "react-router-dom";

//Actions
import {getProducts as listProducts} from '../redux/actions/productActions'
import {setUserDeatils} from '../redux/actions/userAction'

import {Api} from '../utils/Api'

const CategoryScreen = () => {
  const dispatch = useDispatch()

  const [sideToggle, setSideToggle] = useState(false)

  const getProducts = useSelector(state => state.getProducts)
//   const {products, loading, error} = getProducts
  const { category } = useParams();

  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Api.getRequest(`/api/products/category/${category}`).then(res => {
        setProducts(JSON.parse(res.data));
        setLoading(false);
        
    })
  },[category])


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
        <h2 className="homescreen__title">{category}</h2>
        <div className='homescreen__title_after'> </div>
        <div className="category__products">
          {loading ? (
            <h2>Loading...</h2>
          ) 
        //   : error ? (
        //     <h2>{error}</h2>) 
          : products.length == 0 ? (
            <h2 className='center'>
                ไม่มีสินค้า
            </h2>
          ):
          (
            products.map(product => (
              <Product
                key={product._id}
                name={product.name}
                description={product.description}
                price={product.price}
                imageUrl={product.imageUrl}
                productId={product._id}
                date={product.createdAt.slice(0,10)}
                salePrice={product.salePrice}
              />
            ))
          )}
        </div>
        
      </div>
    </>
    
  )
}

export default CategoryScreen
