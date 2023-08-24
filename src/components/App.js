import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Navbar from "./Navbar";
import styles from "../styles/app.module.css";
function App() {
  const [data, setData] = useState([]);
  const [categories, setCatergories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  useEffect(() => {
    if (selectedCategory.length > 2) {
      fetchSelecedCategory();
    } else {
      fetchData();
    }
    fetchCategories();
  }, [selectedCategory]);

  const fetchSelecedCategory = async () => {
    try {
      const apiurl = `https://dummyjson.com/products/category/${selectedCategory}`;
      const response = await fetch(apiurl);
      const jsondata = await response.json();
      const { products } = jsondata;
      setData(products.splice(0, 10));
    } catch (error) {
      console.error("Error fetching Category:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const apiurl = "https://dummyjson.com/products/categories";
      const response = await fetch(apiurl);
      const jsondata = await response.json();
      setCatergories(jsondata);
      console.log(jsondata);
    } catch (error) {
      console.error("Error fetching Categories:", error);
    }
  };
  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    console.log(selectedCategory);
    setSelectedCategory(selectedCategory);
  };

  const fetchData = async () => {
    try {
      const apiurl = "https://dummyjson.com/products";
      const response = await fetch(apiurl);
      const jsondata = await response.json();
      const { products } = jsondata;
      setData(products.splice(0, 10));
      console.log(products);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="App">
      <Navbar />
      <div className={styles.Main}>
        <div className={styles.filters}>
          <span>Filters: </span>
          <button
            className={styles.noFilterButton}
            onClick={() => setSelectedCategory("")}
          >
            No filter
          </button>
          {categories.map((category, index) => (
            <div className={styles.category}>
              <input
                type="radio"
                id={`filter-${index}`}
                key={`filter-${index}`}
                name="filter"
                value={category}
                checked={selectedCategory === category}
                onChange={handleCategoryChange}
              />
              <label htmlFor={`filter-${index}`}>{category}</label>
            </div>
          ))}
        </div>
        <div className={styles.products}>
          {data.map((product, index) => (
            <ProductCard product={product} key={`product-${index}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
