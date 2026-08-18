'use client';

import styles from '../collections/page.module.css';
import ProductCard from '../../components/ProductCard';
import { PRODUCTS } from '../../data/products';

export default function Perfume() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>EAUX DE PARFUM</h1>
        <p className={styles.subtitle}>Exquisite Hand-Poured Perfumes in 50ml &amp; 100ml</p>
      </div>
      <div className={styles.container}>
        <div className={styles.grid}>
          {PRODUCTS.map(product => (
            <div key={product.id} className={styles.productWrapper}>
              <ProductCard
                name={product.name}
                subtitle={product.subtitle}
                basePrice={product.perfumePrice50ml}
                imageUrl={product.image}
                link={`/products/${product.id}`}
              />
              <p className={styles.sizeInfo}>50ml &amp; 100ml</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
