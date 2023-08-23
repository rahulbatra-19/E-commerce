import styles from "../styles/navbar.module.css";
import logo from "../logo.png";
const Navbar = () => {
  return (
    <div className={styles.nav}>
      <img src={logo} className={styles.logo} height={55}></img>
      <div className={styles.searchContainer}>
        <input placeholder="Search a Product" />
        <button id={styles.searchBtn}>Search</button>
      </div>
    </div>
  );
};

export default Navbar;
