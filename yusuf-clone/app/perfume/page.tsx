import styles from '../collections/page.module.css';
import ProductCard from '../../components/ProductCard';

export default function Perfume() {
  const perfumes = [
    { id: 'summer-oud', name: 'SUMMER OUD', price: '2,850.00', image: '/products/summer_oud.png', sizes: '50ml & 100ml' },
    { id: 'canadian-lemon', name: 'CANADIAN LEMON', price: '2,450.00', image: '/products/canadian_lemon.png', sizes: '50ml & 100ml' },
    { id: 'tam-dao', name: 'TAM DAO', price: '3,200.00', image: '/products/tam_dao.png', sizes: '50ml & 100ml' },
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
