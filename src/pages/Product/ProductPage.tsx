import { useLoaderData } from "react-router-dom";
import { Product } from "../../Interfaces/product.interface";

export function ProductPage() {
  // useLoaderData не поддерживает приведение типов и generics в связи с этим приходится явно приводить тип
  const data = useLoaderData() as Product;

  return (
    <div>
      <h1>{data.name}</h1>
    </div>
  );
}
