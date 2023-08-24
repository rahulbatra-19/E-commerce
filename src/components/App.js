import { Profiler, useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Navbar from "./Navbar";
import styles from "../styles/app.module.css";
function App() {
  const [data, setData] = useState([]);
  const [categories, setCatergories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [fetched, setFetched] = useState(false);
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [brands, setBrand] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiurl = "https://dummyjson.com/products";
        const response = await fetch(apiurl);
        const jsondata = await response.json();
        const { products } = jsondata;
        setData(products.slice(0, 10));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (selectedCategory.length > 2) {
      fetchSelecedCategory();
      console.log("data1", data);
      return;
    }
    fetchCategories();
    console.log("data0", data);
    if (!fetched) {
      fetchData();

      // Reset page when category changes

      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [selectedCategory, fetched]);

  const fetchMoreProducts = async () => {
    try {
      const apiUrl = selectedCategory
        ? `https://dummyjson.com/products/category/${selectedCategory}`
        : `https://dummyjson.com/products`;

      const response = await fetch(apiUrl);
      const { products } = await response.json();
      setData((prevData) => [...prevData, ...products.slice(10, 30)]);
      setFetched(true);
    } catch (error) {
      console.error("Error fetching more products:", error);
    }
  };

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (!fetched) {
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        fetchMoreProducts();
      }
    }
  };

  const fetchSelecedCategory = async () => {
    try {
      const apiurl = `https://dummyjson.com/products/category/${selectedCategory}`;
      const response = await fetch(apiurl);
      const jsondata = await response.json();
      const { products } = jsondata;
      setCategoryProducts(products);
      setData(products);
      const brands = [];
      products.map((product) => {
        if (!brands.includes(product.brand)) {
          brands.push(product.brand);
        }
      });
      setBrand(brands);
      setShowMoreFilters(true);
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
    } catch (error) {
      console.error("Error fetching Categories:", error);
    }
  };
  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    // console.log(selectedCategory);
    setSelectedCategory(selectedCategory);
    setCatergories([selectedCategory]);
  };
  const handleBrandChange = (event) => {
    const selectedBrand = event.target.value;
    console.log("brand", selectedBrand);
    const products = categoryProducts.filter(
      (product) => product.brand === selectedBrand
    );
    setData(products);
  };

  return (
    <div className="App">
      <Navbar />
      <div className={styles.Main}>
        <div className={styles.filters}>
          <span>Filters: </span>
          <button
            className={styles.noFilterButton}
            onClick={() => {
              setSelectedCategory("");
              setShowMoreFilters(false);
              fetchCategories();
            }}
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
          {showMoreFilters && (
            <div>
              <span>Brands:</span>
              {brands.map((brand, index) => (
                <div className={styles.category}>
                  <input
                    type="radio"
                    id={`${brand}-${index}`}
                    key={`${brand}-${index}`}
                    name="brand"
                    value={brand}
                    onChange={handleBrandChange}
                  />
                  <label htmlFor={`${brand}-${index}`}>{brand}</label>
                </div>
              ))}
              <span>Price: </span>
              <div className={styles.category}>
                <input
                  type="radio"
                  id="price-asc"
                  key="price-asc"
                  name="price"
                  value="price-asc"
                  onChange={() => {
                    const sortedProducts = [...data].sort(
                      (a, b) => a.price - b.price
                    );
                    setData(sortedProducts);
                  }}
                />
                <label htmlFor="price-asc">Low to High</label>
              </div>
              <div className={styles.category}>
                <input
                  type="radio"
                  id="price-dsc"
                  key="price-dsc"
                  name="price"
                  value="price-dsc"
                  onChange={() => {
                    const sortedProducts = [...data].sort(
                      (a, b) => b.price - a.price
                    );
                    setData(sortedProducts);
                  }}
                />
                <label htmlFor="price-dsc">High to Low</label>
              </div>
            </div>
          )}
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
