import { ChangeEvent, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Search from "../../components/Search/Search";
import { PREFIX } from "../../helpers/API";
import { Product } from "../../Interfaces/product.interface";
import styles from "./Menu.module.css";
import axios, { AxiosError } from "axios";
import { MenuList } from "./MenuList/MenuList";

export function Menu() {
  // Указываем, что products будет массивом Product[] прямо в useState, пользуясь Generics
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    getProducts(filter)
  }, [filter])

  async function getProducts(name?: string) {
    try {
      setLoading(true);
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 200);
      });
      const { data } = await axios.get<Product[]>(`${PREFIX}/products`, {
        params: {
          name: name,
        },
      });
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

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setFilter(event.target.value);
  }

  return (
    <>
      <div className={styles["head"]}>
        <Header>Menu</Header>
        <Search
          placeholder="Search by name or composition"
          onChange={handleChange}
        ></Search>
      </div>
      <div>
        {error && (
          <>
            <h1>{error}</h1>
          </>
        )}
        {!loading && products.length > 0 && <MenuList products={products}></MenuList>}
        {!loading && products.length === 0 && <><h1>Not found</h1></>}
        {loading && (
          <>
            <h1>Loading products...</h1>
          </>
        )}
      </div>
    </>
  );
}


