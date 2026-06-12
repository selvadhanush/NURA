import styles from './page.module.css';
import ProductCard from '../../components/ProductCard';

export default function Collections() {
  const allProducts = [
    { id: 1, name: 'Jasmine', price: '569.00', image: '/products/jasmine_oil.png' },
    { id: 2, name: 'AL-ZAF', price: '520.00', image: '/products/al_zaf.png' },
    { id: 3, name: 'Al Harun V1', price: '710.00', image: '/products/al_haroon.png' },
    { id: 4, name: 'Lattafa Khamrah V1', price: '729.00', image: '/products/latafa_khamrah.png' },
    { id: 5, name: 'Al Marziyah', price: '680.00', image: '/products/almarziyah.png' },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>ALL COLLECTIONS</h1>
      </div>
      
      <div className={styles.container}>
        <div className={styles.grid}>
          {allProducts.map(product => (
            <ProductCard 
              key={product.id}
              name={product.name}
              price={product.price}
              imageUrl={product.image}
              link={`/products/${product.id}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
