import styles from './ProductCard.module.css';
import Link from 'next/link';

interface ProductCardProps {
  name: string;
  price: string;
  imageUrl: string;
  link: string;
}

export default function ProductCard({ name, price, imageUrl, link }: ProductCardProps) {
  return (
    <Link href={link} className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={name} className={styles.placeholderImage} />
      </div>
      <div className={styles.details}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.price}>FROM ₹ {price}</p>
      </div>
    </Link>
  );
}
