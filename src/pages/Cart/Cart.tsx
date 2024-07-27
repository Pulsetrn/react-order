import { useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import { RootState } from "../../storage/store";
import CartItem from "../../components/CartItem/CartItem";
import { Product } from "../../Interfaces/product.interface";
import { useEffect, useState } from "react";
import axios from "axios";
import { PREFIX } from "../../helpers/API";

export function Cart() {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const items = useSelector((state: RootState) => state.cart.items);

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

  // Используем useEffect, чтобы подписаться на факт добавления пользователем
  // новых данных в корзину и отображать соответственно новые продукты в компоненты для визуала
  useEffect(() => {
    loadProducts();
  }, [items]);

  return (
    <div>
      <Header>Cart</Header>
      {items.map((item) => {
        const product = cartProducts.find((p) => p.id === item.id);
        if (!product) {
          return;
        } else {
          return <CartItem {...product} count={item.count} />;
        }
      })}
    </div>
  );
}
