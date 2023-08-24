import styles from "../styles/navbar.module.css";
import logo from "../logo.png";
import { useEffect, useState } from "react";
const Navbar = () => {
  const [searchText, setSearchText] = useState("");
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [searchProduct, setSearchProduct] = useState([]);
  useEffect(() => {
    if (searchText.length > 2 && search.length > 0) {
      setShowSearch(true);
      fetch(`https://dummyjson.com/products/search?q=${search}`)
        .then((res) => res.json())
        .then((products) => {
          setSearchProduct(products.products);
          console.log(products);
        });
    } else {
      setShowSearch(false);
      setSearch("");
      setSearchProduct([]);
    }
  }, [search, searchText]);
  return (
    <div className={styles.nav}>
      <img src={logo} className={styles.logo} height={55}></img>
      <div className={styles.searchContainer}>
        <input
          placeholder="Search a Product"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          id={styles.searchBtn}
          onClick={() => {
            setSearch(searchText);
          }}
        >
          Search
        </button>
      </div>
      {showSearch && (
        <div className={styles.searchResults}>
          {searchProduct.map((product) => (
            <div className={styles.searchResult}>
              <img
                src={product.thumbnail}
                className={styles.searchImage}
                alt="searchPic"
              />
              <div className={styles.movieInfo}>
                <span>
                  {product.title}
                  <br /> ${product.price}
                </span>
                <button className={styles.addToCartBtn}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Navbar;
