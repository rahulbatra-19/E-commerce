import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const apiurl = "https://dummyjson.com/products";
    fetch(apiurl)
      .then((response) => response.json())
      .then((data) => {
        const { products } = data;
        setData(products);
      });
  }, [data]);
  return (
    <div className="App">
      {data.map((product, index) => (
        <ProductCard product={product} key={`product-${index}`} />
      ))}
    </div>
  );
}

export default App;
