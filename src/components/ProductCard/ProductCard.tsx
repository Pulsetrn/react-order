import styles from "./ProductCard.module.css";
import cn from "classnames";
import { ProductCardProps } from "./ProductCard.props";
import { Link } from "react-router-dom";
import { MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../../storage/cart.slice";
import { AppDispatch } from "../../storage/store";
function ProductCard(props: ProductCardProps) {
  const dispatch = useDispatch<AppDispatch>();

  // обязательно имортируем MouseEvent из React
  function handleClick(event: MouseEvent) {
    event.preventDefault();
    dispatch(cartActions.add(props.id))
  }
  
  return (
    <Link to={`/product/${props.id}`} className={styles["link"]}>
      <div className={styles["card"]}>
        <div
          className={styles["head"]}
          style={{ backgroundImage: `url('${props.image}')` }}
        >
          <div className={styles["price"]}>
            {props.price}
            <span className={styles["currency"]}>$</span>
          </div>
          <button className={cn(styles["add-to-cart"])} onClick={handleClick}>
            <img src="/cart-button-icon.svg" alt="" />
          </button>
          <div className={styles["rating"]}>
            {props.rating}
            <img src="/star-icon.svg" alt="" />
          </div>
        </div>
        <div className={styles["footer"]}>
          <div className={styles["title"]}>{props.title}</div>
          <div className={styles["description"]}>{props.description}</div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
