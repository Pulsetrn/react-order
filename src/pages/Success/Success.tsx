import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import styles from "./Success.module.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../storage/store";
import { cartActions } from "../../storage/cart.slice";

export function Success() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  function handleClick() {
    navigate("/");
  }

  return (
    <div className={styles["success"]}>
      <img src="/pizza.png" alt="" />
      <div className={styles["text"]}>
        your order has been successfully completed
      </div>
      <Button appearence="big" onClick={handleClick}>
        Create new one
      </Button>
    </div>
  );
}
