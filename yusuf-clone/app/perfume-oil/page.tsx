'use client';

import styles from '../collections/page.module.css';
import ProductCard from '../../components/ProductCard';
import { PRODUCTS } from '../../data/products';

export default function PerfumeOil() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>CONCENTRATED PERFUME OILS</h1>
        <p className={styles.subtitle}>Pure Essences in 6ml &amp; 12ml</p>
      </div>
      <div className={styles.container}>
        <div className={styles.grid}>
          {PRODUCTS.map(product => (
            <div key={product.id} className={styles.productWrapper}>
              <ProductCard
                name={product.name}
                basePrice={product.oilPrice6ml}
                imageUrl={product.image}
                link={`/products/${product.id}`}
              />
              <p className={styles.sizeInfo}>6ml &amp; 12ml</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
