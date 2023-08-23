import { useEffect, useState } from "react";
import styles from "../styles/product.module.css";
function ProductCard(props) {
  const { product } = props;
  return (
    <div className={styles.productCard}>
      <div className={styles.left}>
        <img alt="product-image" src={product.thumbnail} />
      </div>
      <div className={styles.right}>
        <div className={styles.title}>{product.title}</div>
        <div className={styles.plot}> {product.description}</div>
        <div className={styles.rating}>{product.rating} ⭐️</div>
        <div className={styles.footer}>
          <div className={styles.price}> ₹{product.price}</div>
          <div className={styles.CartBtn}>Add to Cart</div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
