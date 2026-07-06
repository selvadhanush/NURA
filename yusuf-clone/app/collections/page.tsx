'use client';

import { useState, useMemo } from 'react';
import styles from './page.module.css';
import ProductCard from '../../components/ProductCard';
import { PRODUCTS, Product } from '../../data/products';

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

export default function Collections() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFamily, setSelectedFamily] = useState<string>('All');
  const [selectedGender, setSelectedGender] = useState<string>('All');
  const [sortBy, setSortBy] = useState<SortOption>('default');

  const families = ['All', 'Floral', 'Woody', 'Sweet', 'Spicy', 'Citrus', 'Fresh'];
  const genders = ['All', 'Unisex', 'Men', 'Women'];

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        p => p.name.toLowerCase().includes(q) || 
             p.description.toLowerCase().includes(q) ||
             p.notes.top.toLowerCase().includes(q) ||
             p.notes.heart.toLowerCase().includes(q) ||
             p.notes.base.toLowerCase().includes(q)
      );
    }

    // Fragrance family filter
    if (selectedFamily !== 'All') {
      result = result.filter(p => p.family === selectedFamily);
    }

    // Gender filter
    if (selectedGender !== 'All') {
      result = result.filter(p => p.gender === selectedGender);
    }

    // Sorting logic
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.oilPrice6ml - b.oilPrice6ml);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.oilPrice6ml - a.oilPrice6ml);
    } else if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name-desc') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  }, [searchQuery, selectedFamily, selectedGender, sortBy]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedFamily('All');
    setSelectedGender('All');
    setSortBy('default');
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>ALL COLLECTIONS</h1>
        <p className={styles.subtitle}>Premium Hand-Poured Fragrances & Oils</p>
      </div>
      
      <div className={styles.container}>
        {/* Filter & Sort Bar */}
        <div className={styles.filterBar}>
          <div className={styles.searchSortRow}>
            <input 
              type="text" 
              placeholder="Search by notes or scent name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchBar}
            />
            
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className={styles.sortSelect}
            >
              <option value="default">Default Sorting</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Alphabetical: A-Z</option>
              <option value="name-desc">Alphabetical: Z-A</option>
            </select>
          </div>

          <div className={styles.filterSection}>
            {/* Fragrance Families */}
            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>Fragrance Family</span>
              <div className={styles.filterButtons}>
                {families.map(family => (
                  <button
                    key={family}
                    className={`${styles.filterBtn} ${selectedFamily === family ? styles.filterBtnActive : ''}`}
                    onClick={() => setSelectedFamily(family)}
                  >
                    {family}
                  </button>
                ))}
              </div>
            </div>

            {/* Gender Suitability */}
            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>Gender Preference</span>
              <div className={styles.filterButtons}>
                {genders.map(gender => (
                  <button
                    key={gender}
                    className={`${styles.filterBtn} ${selectedGender === gender ? styles.filterBtnActive : ''}`}
                    onClick={() => setSelectedGender(gender)}
                  >
                    {gender}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active Filter Summary / Reset */}
          {(selectedFamily !== 'All' || selectedGender !== 'All' || searchQuery !== '' || sortBy !== 'default') && (
            <div className={styles.activeFiltersRow}>
              <span>Showing {filteredAndSortedProducts.length} results matching your choices</span>
              <button onClick={handleClearFilters} className={styles.clearFiltersBtn}>
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Results Grid */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className={styles.grid}>
            {filteredAndSortedProducts.map(product => (
              <div key={product.id} className={styles.productWrapper}>
                <ProductCard 
                  name={product.name}
                  price={new Intl.NumberFormat('en-IN').format(product.oilPrice6ml)}
                  imageUrl={product.image}
                  link={`/products/${product.id}`}
                />
                <span className={styles.sizeInfo}>From {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(product.oilPrice6ml)}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.noResults}>
            <h3>No Fragrances Match Your Criteria</h3>
            <p>Try refining your search or resetting the active filters to see our full catalogue.</p>
            <button onClick={handleClearFilters} className={styles.secondaryButton} style={{ border: '1px solid var(--color-gold)', color: 'var(--color-gold)', background: 'transparent', padding: '0.8rem 2rem', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer' }}>
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
