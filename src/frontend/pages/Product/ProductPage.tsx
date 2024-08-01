import { useLoaderData } from "react-router-dom";
import { Product } from "../../Interfaces/product.interface";
import styles from "./ProductPage.module.css";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../storage/store";
import { cartActions } from "../../storage/cart.slice";

export function ProductPage() {
  // useLoaderData не поддерживает приведение типов и generics в связи с этим приходится явно приводить тип
  const data = useLoaderData() as Product;
  const dispatch = useDispatch<AppDispatch>();

  function handleClick() {
    dispatch(cartActions.add(data.id));
  }

  return (
    <>
      <div className={styles["header"]}>
        <div className={styles["inner-header"]}>
          <Link to="/" className={styles["back-link"]}>Back to menu</Link>
          <Header>{data.name}</Header>
        </div>
        <Button appearence="small" onClick={handleClick}>
          <span>Add to cart</span>
        </Button>
      </div>
      <div className={styles["description"]}>
        <div
          className={styles["image"]}
          style={{ backgroundImage: `url('${data.image}')` }}
        ></div>
        <div className={styles["info"]}>
          <div className={styles["line"]}>
            <div className={styles["text"]}>Price</div>
            <div className={styles["price"]}>{data.price}$</div>
          </div>
          <hr className={styles["hr"]} />
          <div className={styles["line"]}>
            <div className={styles["text"]}>Rating</div>
            <div className={styles["rating"]}>
              {data.rating}
              <img src="/star-icon.svg" alt="" className={styles["star"]} />
            </div>
          </div>
          <div className={styles["line-compound"]}>
            <div className={styles["text-compound"]}>Compound</div>
            <ul className={styles["compound"]}>
              {data.ingredients.map((item) => {
                return (
                  <li className={styles["compound-item"]}>
                    {item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
