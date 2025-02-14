import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import { AppDispatch, RootState } from "../../storage/store";
import CartItem from "../../components/CartItem/CartItem";
import { Product } from "../../Interfaces/product.interface";
import { useEffect, useState } from "react";
import axios from "axios";
import { PREFIX } from "../../helpers/API";
import styles from "./Cart.module.css";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../../storage/cart.slice";

export function Cart() {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const items = useSelector((state: RootState) => state.cart.items);
  const jwt = useSelector((state: RootState) => state.user.jwt);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // helper функция, которая позволяет по id предмета в корзине получить полноценный Product с сервера
  async function getItem(id: number) {
    const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`);
    return data;
  }

  // Функция, которая воспользутся глобальным (с точки зрения redux) массивом cartitem'ов
  // и каждый cartitem с использованием его идентификатора отобразит в Promis<Product>, который
  // в свою очередь будет зарезолвлен в процессе выполнения тела функции в Promise.all
  // то есть в результате будет получен массив с Product, которые были получены по id CartItem
  async function loadProducts() {
    const result = await Promise.all(
      items.map((item) => {
        return getItem(item.id);
      })
    );
    setCartProducts(result);
  }

  async function checkout() {
    await axios.post(
      `${PREFIX}/order`,
      {
        products: items,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    dispatch(cartActions.clear());
    navigate("/success");
  }

  // Используем useEffect, чтобы подписаться на факт добавления пользователем
  // новых данных в корзину и отображать соответственно новые продукты в компоненты для визуала
  useEffect(() => {
    loadProducts();
  }, [items]);

  return (
    <>
      <div>
        <Header className={styles["head"]}>Cart</Header>
        {items.map((item) => {
          const product = cartProducts.find((p) => p.id === item.id);
          if (!product) {
            return;
          } else {
            return <CartItem key={item.id} {...product} count={item.count} />;
          }
        })}
      </div>
      <div className={styles["line"]}>
        <div className={styles["text"]}>Total</div>
        <div className={styles["price"]}>
          {items
            .map((item) => {
              const product = cartProducts.find((p) => p.id === item.id);
              if (!product) {
                return 0;
              } else {
                return item.count * product.price;
              }
            })
            .reduce((acc, amount) => {
              acc += amount;
              return acc;
            }, 0)}
          $
        </div>
      </div>
      <hr className={styles["hr"]} />
      <div className={styles["line"]}>
        <div className={styles["text"]}>Delivery</div>
        <div className={styles["price"]}>360 $</div>
      </div>
      <div className={styles["checkout"]}>
        <Button appearence="big" onClick={checkout}>
          Submit
        </Button>
      </div>
    </>
  );
}
