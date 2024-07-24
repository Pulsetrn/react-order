import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import ProductCard from "../../components/ProductCard/ProductCard";
import Search from "../../components/Search/Search";
import { PREFIX } from "../../Helpers/API";
import { Product } from "../../Interfaces/product.interface";
import styles from "./Menu.module.css";
import axios, { AxiosError } from "axios";
import { MenuList } from "./MenuList/MenuList";

export function Menu() {
  // Указываем, что products будет массивом Product[] прямо в useState, пользуясь Generics
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  async function getProducts() {
    try {
      setLoading(true);
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 200);
      });
      const { data } = await axios.get<Product[]>(`${PREFIX}/products`);
      setProducts(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      if (err instanceof AxiosError) {
        setError(err.message);
      }
      setLoading(false);
      return new Error(`Something went wrong`);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className={styles["head"]}>
        <Header>Menu</Header>
        <Search placeholder="Search by name or composition"></Search>
      </div>
      <div>
        {error && <><h1>{error}</h1></>}
        {!loading && <MenuList products={products}></MenuList>}
        {loading && (
          <>
            <h1>Loading products...</h1>
          </>
        )}
      </div>
    </>
  );
}
