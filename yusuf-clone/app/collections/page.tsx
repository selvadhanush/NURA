import styles from './page.module.css';
import ProductCard from '../../components/ProductCard';
import { PRODUCTS } from '../../data/products';

export default function Collections() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>ALL COLLECTIONS</h1>
      </div>
      
      <div className={styles.container}>
        <div className={styles.grid}>
          {PRODUCTS.map(product => (
            <ProductCard 
              key={product.id}
              name={product.name}
              price={product.oilPrice6ml.toFixed(2)}
              imageUrl={product.image}
              link={`/products/${product.id}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
