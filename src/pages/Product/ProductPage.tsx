import { useLoaderData } from "react-router-dom";
import { Product } from "../../Interfaces/product.interface";

export function ProductPage() {
  const data = useLoaderData() as Product;

  return (
    <div>
      <h1>{data.name}</h1>
    </div>
  );
}
