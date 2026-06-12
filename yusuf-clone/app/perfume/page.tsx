import styles from '../collections/page.module.css';
import ProductCard from '../../components/ProductCard';

export default function Perfume() {
  const perfumes = [
    { id: 'jasmine', name: 'Jasmine', price: '2,590.00', image: '/products/jasmine_oil.png', sizes: '50ml & 100ml' },
    { id: 'al-zaf', name: 'AL-ZAF', price: '2,390.00', image: '/products/al_zaf.png', sizes: '50ml & 100ml' },
    { id: 'al-haroon', name: 'Al Harun V1', price: '2,990.00', image: '/products/al_haroon.png', sizes: '50ml & 100ml' },
    { id: 'latafa-khamrah', name: 'Lattafa Khamrah V1', price: '3,090.00', image: '/products/latafa_khamrah.png', sizes: '50ml & 100ml' },
    { id: 'almarziyah', name: 'Al Marziyah', price: '2,890.00', image: '/products/almarziyah.png', sizes: '50ml & 100ml' },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>PERFUMES</h1>
        <p className={styles.subtitle}>Exquisite Fragrances in 50ml & 100ml</p>
      </div>
      <div className={styles.container}>
        <div className={styles.grid}>
          {perfumes.map(product => (
            <div key={product.id} className={styles.productWrapper}>
              <ProductCard 
                name={product.name}
                price={product.price}
                imageUrl={product.image}
                link={`/products/${product.id}`}
              />
              <p className={styles.sizeInfo}>{product.sizes}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
