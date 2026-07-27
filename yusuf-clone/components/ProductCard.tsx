'use client';

import styles from './ProductCard.module.css';
import Link from 'next/link';
import { useCurrency } from './CurrencyContext';

interface ProductCardProps {
  name: string;
  /** Raw INR base price (from products.ts) */
  basePrice: number;
  imageUrl: string;
  link: string;
}

export default function ProductCard({ name, basePrice, imageUrl, link }: ProductCardProps) {
  const { fmt } = useCurrency();

  return (
    <Link href={link} className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={name} className={styles.placeholderImage} />
      </div>
      <div className={styles.details}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.price}>FROM {fmt(basePrice)}</p>
      </div>
    </Link>
  );
}
