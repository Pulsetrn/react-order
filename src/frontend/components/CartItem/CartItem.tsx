import styles from "./CartItem.module.css";
import cn from "classnames";
import { useDispatch } from "react-redux";
import { cartActions } from "../../storage/cart.slice";
import { AppDispatch } from "../../storage/store";
import { CartItemProps } from "./CartItem.props";

function CartItem(props: CartItemProps) {
  const dispatch = useDispatch<AppDispatch>();

  function IncreaseItemsNum() {
    dispatch(cartActions.add(props.id));
  }

  function decreaseItemsNum() {
    dispatch(cartActions.remove(props.id));
  }

  function deleteItemFromCart() {
    dispatch(cartActions.delete(props.id));
  }

  return (
    <div className={styles["item"]}>
      <div
        className={styles["image"]}
        style={{ backgroundImage: `url('${props.image}')` }}
      ></div>
      <div className={styles["description"]}>
        <div className={styles["name"]}>{props.name}</div>
        <div className={styles["currency"]}>{props.price}$</div>
      </div>
      <div className={styles["actions"]}>
        <button className={cn(styles["minus"])} onClick={decreaseItemsNum}>
          <img src="minus-icon.svg" alt="" />
        </button>
        <div className={styles["number"]}>{props.count}</div>
        <button className={cn(styles["plus"])} onClick={IncreaseItemsNum}>
          <img src="plus-icon.svg" alt="" />
        </button>
        <button className={styles["remove"]} onClick={deleteItemFromCart}>
          <img src="delete-icon.svg" alt="" />
        </button>
      </div>
    </div>
  );
}

export default CartItem;
