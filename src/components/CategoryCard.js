import "./CategoryCard.css";
import { Link } from "react-router-dom";

const CategoryCard = ({ name, image }) => {

  return (
    <div className="category_cart">
      <img src={image} alt={name} className="img"/>
      <div className="product__info">
        <p className="info__name">{name}</p>
      </div>
    </div> 
  );
};

export default CategoryCard;
