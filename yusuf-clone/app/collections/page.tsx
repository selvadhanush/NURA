import styles from './page.module.css';
import ProductCard from '../../components/ProductCard';

export default function Collections() {
  const allProducts = [
    { id: 1, name: 'NURA SAUVAGE', price: '1,550.00', image: 'https://via.placeholder.com/400x500/1a3322/c5ab84?text=SAUVAGE' },
    { id: 2, name: 'NURA BLEU DE', price: '1,550.00', image: 'https://via.placeholder.com/400x500/1a3322/c5ab84?text=BLEU+DE' },
    { id: 3, name: 'NURA AVENTUS', price: '1,950.00', image: 'https://via.placeholder.com/400x500/1a3322/c5ab84?text=AVENTUS' },
    { id: 4, name: 'NURA OMBRE LEATHER', price: '1,950.00', image: 'https://via.placeholder.com/400x500/1a3322/c5ab84?text=OMBRE+LEATHER' },
    { id: 5, name: 'DEJA VU', price: '2,500.00', image: 'https://via.placeholder.com/400x500/1a3322/c5ab84?text=DEJA+VU' },
    { id: 6, name: 'NOBLE', price: '3,000.00', image: 'https://via.placeholder.com/400x500/1a3322/c5ab84?text=NOBLE' },
    { id: 7, name: 'POEM', price: '2,800.00', image: 'https://via.placeholder.com/400x500/1a3322/c5ab84?text=POEM' },
    { id: 8, name: 'TEEB', price: '2,100.00', image: 'https://via.placeholder.com/400x500/1a3322/c5ab84?text=TEEB' },
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
