import "./CategoryCard.css";
import { useHistory } from "react-router-dom";

const CategoryCard = ({ name, image}) => {

  const history = useHistory()

  const onSelect = () => {
    history.push(`/category/${name}`)
  }
  return (
    <div className="category_cart">
      <img src={image} alt={name} className="img" onClick={onSelect}/>
      <div className="product__info">
        <p className="info__name">{name}</p>
      </div>
    </div> 
  );
};

export default CategoryCard;
