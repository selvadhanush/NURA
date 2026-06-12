import styles from '../collections/page.module.css';
import ProductCard from '../../components/ProductCard';

export default function PerfumeOil() {
  const oils = [
    { id: 'jasmine', name: 'Jasmine', price: '569.00', image: '/products/jasmine_oil.png', sizes: '6ml & 12ml' },
    { id: 'al-zaf', name: 'AL-ZAF', price: '520.00', image: '/products/al_zaf.png', sizes: '6ml & 12ml' },
    { id: 'al-haroon', name: 'Al Harun V1', price: '710.00', image: '/products/al_haroon.png', sizes: '6ml & 12ml' },
    { id: 'latafa-khamrah', name: 'Lattafa Khamrah V1', price: '729.00', image: '/products/latafa_khamrah.png', sizes: '6ml & 12ml' },
    { id: 'almarziyah', name: 'Al Marziyah', price: '680.00', image: '/products/almarziyah.png', sizes: '6ml & 12ml' },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>PERFUME OILS</h1>
        <p className={styles.subtitle}>Pure Essences in 6ml & 12ml</p>
      </div>
      <div className={styles.container}>
        <div className={styles.grid}>
          {oils.map(product => (
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
