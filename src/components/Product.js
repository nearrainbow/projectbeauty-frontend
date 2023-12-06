import "./Product.css";
import { Link } from "react-router-dom";

const Product = ({ imageUrl, description, price, salePrice, name, productId, date, view }) => {

  function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div className="product">
      <img src={imageUrl[0]} alt={name} className="img"/>

      <div className="product__info">
        <p className="info__name">{name}</p>

        {/* <p className="info__description">{description.substring(0, 100)}...</p> */}
        {
          salePrice && salePrice != 0 ? (
          <>
            <p className="info__price">{formatPrice(price)} บาท</p>
            <p className="sale_price">{formatPrice(salePrice)} บาท</p>
          </>
        ): ( 
          <p className="sale_price">{formatPrice(price)} บาท</p>
        )}
        
        <hr className="dotted"></hr>
        <Link to={`/product/${productId}`} className="info__button ">
          <i className="fa fa-shopping-cart fa-icon1x"></i> เพิ่มเข้าตะกร้า
        </Link>
        <hr className="dotted"></hr>
        <p>
          <i className="fa fa-calendar" ></i> {date}</p>
      </div>
      <p> <i className="fa fa-eye"></i> {view}                        </p>
    </div> 
  );
};

export default Product;
