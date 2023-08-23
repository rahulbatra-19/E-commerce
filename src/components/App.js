import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Navbar from "./Navbar";
function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const apiurl = "https://dummyjson.com/products";
    fetch(apiurl)
      .then((response) => response.json())
      .then((data) => {
        const { products } = data;
        setData(products.splice(0, 10));
      });
  }, [data]);
  return (
    <div className="App">
      <Navbar />
      {data.map((product, index) => (
        <ProductCard product={product} key={`product-${index}`} />
      ))}
    </div>
  );
}

export default App;
