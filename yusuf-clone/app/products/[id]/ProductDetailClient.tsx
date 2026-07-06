'use client';

import { useState, useEffect } from 'react';
import { Product } from '../../../data/products';
import { useCart } from '../../../components/CartContext';
import styles from './page.module.css';
import Link from 'next/link';

export default function ProductDetailClient({ product }: { product: Product | undefined }) {
  const { addToCart, setIsCartOpen } = useCart();

  const [type, setType] = useState<'perfume' | 'oil'>('perfume');
  const [size, setSize] = useState<'50ml' | '100ml' | '6ml' | '12ml'>('50ml');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImageTab, setActiveImageTab] = useState<'front' | 'detail' | 'packaging' | 'lifestyle'>('front');
  const [showToast, setShowToast] = useState(false);

  // Sync size when type changes
  useEffect(() => {
    if (type === 'perfume') {
      setSize('50ml');
    } else {
      setSize('6ml');
    }
  }, [type]);

  if (!product) {
    return (
      <div className={styles.notFoundPage}>
        <div className={styles.notFoundContainer}>
          <h2 className={styles.notFoundTitle}>Fragrance Not Found</h2>
          <p className={styles.notFoundText}>The signature fragrance you are looking for doesn't exist or has been archived.</p>
          <Link href="/collections" className={styles.backButton}>
            Return to Collections
          </Link>
        </div>
      </div>
    );
  }

  // Determine pricing based on selections
  let currentPrice = product.perfumePrice50ml;
  if (type === 'perfume') {
    currentPrice = size === '100ml' ? product.perfumePrice100ml : product.perfumePrice50ml;
  } else {
    currentPrice = size === '12ml' ? product.oilPrice12ml : product.oilPrice6ml;
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      image: product.image,
      type,
      size,
      price: currentPrice
    }, quantity);

    setShowToast(true);
  };

  const handleToastAction = () => {
    setShowToast(false);
    setIsCartOpen(true);
  };

  return (
    <div className={styles.page}>
      {/* Toast Notification */}
      {showToast && (
        <div className={styles.toastContainer}>
          <div className={styles.toastCard}>
            <img src={product.image} alt={product.name} className={styles.toastImage} />
            <div className={styles.toastInfo}>
              <span className={styles.toastTitle}>Added to Cart</span>
              <h4 className={styles.toastName}>{product.name}</h4>
              <p className={styles.toastMeta}>
                {type === 'perfume' ? 'Eau de Parfum' : 'Concentrated Oil'} — {size} ({quantity}x)
              </p>
              <button 
                onClick={handleToastAction} 
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: 'var(--color-gold)', 
                  fontWeight: 600, 
                  fontSize: '0.8rem', 
                  letterSpacing: '1px', 
                  marginTop: '0.25rem',
                  padding: 0,
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                VIEW CART & CHECKOUT
              </button>
            </div>
            <button 
              className={styles.toastCloseBtn} 
              onClick={() => setShowToast(false)}
              aria-label="Close Notification"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      <div className={styles.container}>
        <div className={styles.backLinkRow}>
          <Link href="/collections" className={styles.backLink}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Collections
          </Link>
        </div>

        <div className={styles.productLayout}>
          {/* Interactive Image Gallery */}
          <div className={styles.imageColumn}>
            <div className={styles.imageCard}>
              <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className={`${styles.productImage} ${activeImageTab === 'detail' ? styles.detailViewImage : ''}`} 
                />
                
                {activeImageTab === 'packaging' && (
                  <div className={styles.packagingOverlay}>
                    <div className={styles.packagingHeader}>NURA BY BIN SADHIK</div>
                    <div className={styles.packagingFooter}>AUTHENTIC • HAND-POURED IN INDIA</div>
                  </div>
                )}
                
                {activeImageTab === 'lifestyle' && (
                  <div className={styles.lifestyleOverlay}>
                    <p className={styles.lifestyleText}>"A sensory journey of pure oils & botanical luxury."</p>
                    <span className={styles.lifestyleSub}>THE CIRCLE OF LIGHT COLLECTION</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className={styles.imageTabRow}>
              <button 
                className={`${styles.imageTabBtn} ${activeImageTab === 'front' ? styles.imageTabBtnActive : ''}`}
                onClick={() => setActiveImageTab('front')}
              >
                Front View
              </button>
              <button 
                className={`${styles.imageTabBtn} ${activeImageTab === 'detail' ? styles.imageTabBtnActive : ''}`}
                onClick={() => setActiveImageTab('detail')}
              >
                Close-up
              </button>
              <button 
                className={`${styles.imageTabBtn} ${activeImageTab === 'packaging' ? styles.imageTabBtnActive : ''}`}
                onClick={() => setActiveImageTab('packaging')}
              >
                Packaging
              </button>
              <button 
                className={`${styles.imageTabBtn} ${activeImageTab === 'lifestyle' ? styles.imageTabBtnActive : ''}`}
                onClick={() => setActiveImageTab('lifestyle')}
              >
                Lifestyle
              </button>
            </div>
          </div>

          {/* Details Column */}
          <div className={styles.detailsColumn}>
            <span className={styles.brandTag}>NURA BY BIN SADHIK</span>
            <h1 className={styles.productName}>{product.name}</h1>
            <p className={styles.productPrice}>{formatCurrency(currentPrice)}</p>

            <div className={styles.divider}></div>

            <p className={styles.productDescription}>{product.description}</p>

            <div className={styles.selectors}>
              {/* Type Selection */}
              <div className={styles.selectorGroup}>
                <span className={styles.selectorLabel}>Fragrance Format</span>
                <div className={styles.toggleGrid}>
                  <button
                    className={`${styles.toggleBtn} ${type === 'perfume' ? styles.toggleBtnActive : ''}`}
                    onClick={() => setType('perfume')}
                  >
                    Eau de Parfum
                  </button>
                  <button
                    className={`${styles.toggleBtn} ${type === 'oil' ? styles.toggleBtnActive : ''}`}
                    onClick={() => setType('oil')}
                  >
                    Concentrated Perfume Oil
                  </button>
                </div>
              </div>

              {/* Size Selection */}
              <div className={styles.selectorGroup}>
                <span className={styles.selectorLabel}>Select Volume</span>
                <div className={styles.toggleGrid}>
                  {type === 'perfume' ? (
                    <>
                      <button
                        className={`${styles.toggleBtn} ${size === '50ml' ? styles.toggleBtnActive : ''}`}
                        onClick={() => setSize('50ml')}
                      >
                        50ml — {formatCurrency(product.perfumePrice50ml)}
                      </button>
                      <button
                        className={`${styles.toggleBtn} ${size === '100ml' ? styles.toggleBtnActive : ''}`}
                        onClick={() => setSize('100ml')}
                      >
                        100ml — {formatCurrency(product.perfumePrice100ml)}
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className={`${styles.toggleBtn} ${size === '6ml' ? styles.toggleBtnActive : ''}`}
                        onClick={() => setSize('6ml')}
                      >
                        6ml — {formatCurrency(product.oilPrice6ml)}
                      </button>
                      <button
                        className={`${styles.toggleBtn} ${size === '12ml' ? styles.toggleBtnActive : ''}`}
                        onClick={() => setSize('12ml')}
                      >
                        12ml — {formatCurrency(product.oilPrice12ml)}
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Quantity Selection */}
              <div className={styles.selectorGroup}>
                <span className={styles.selectorLabel}>Quantity</span>
                <div className={styles.quantityRow}>
                  <div className={styles.quantityControl}>
                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => setQuantity(q => q + 1)}>+</button>
                  </div>
                  <span className={styles.totalCalculation}>
                    Total: {formatCurrency(currentPrice * quantity)}
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.actionRow}>
              <button className={styles.addToCartBtn} onClick={handleAddToCart}>
                ADD TO CART
              </button>
            </div>

            {/* Fragrance Notes Redesign */}
            <div className={styles.notesSection}>
              <h3 className={styles.detailSectionTitle}>Fragrance Profile</h3>
              <div className={styles.notesGrid}>
                <div className={styles.noteCard}>
                  <span className={styles.noteType}>Top Notes</span>
                  <p className={styles.noteValue}>{product.notes.top}</p>
                </div>
                <div className={styles.noteCard}>
                  <span className={styles.noteType}>Heart Notes</span>
                  <p className={styles.noteValue}>{product.notes.heart}</p>
                </div>
                <div className={styles.noteCard}>
                  <span className={styles.noteType}>Base Notes</span>
                  <p className={styles.noteValue}>{product.notes.base}</p>
                </div>
              </div>
            </div>

            {/* Performance Sliders */}
            <div className={styles.performanceSection}>
              <h3 className={styles.detailSectionTitle}>Performance & Longevity</h3>
              <div className={styles.perfGrid}>
                <div className={styles.perfItem}>
                  <div className={styles.perfLabelRow}>
                    <span>Scent Longevity</span>
                    <span className={styles.perfValue}>{product.performance.longevity}</span>
                  </div>
                  <div className={styles.progressBarBg}>
                    <div 
                      className={styles.progressBarFilled} 
                      style={{ 
                        width: product.performance.longevity.includes('12+') ? '95%' : 
                               product.performance.longevity.includes('10+') ? '85%' : '70%' 
                      }}
                    ></div>
                  </div>
                </div>
                
                <div className={styles.perfItem}>
                  <div className={styles.perfLabelRow}>
                    <span>Sillage (Projection)</span>
                    <span className={styles.perfValue}>{product.performance.projection}</span>
                  </div>
                  <div className={styles.progressBarBg}>
                    <div 
                      className={styles.progressBarFilled} 
                      style={{ 
                        width: product.performance.projection.includes('Strong') ? '92%' : 
                               product.performance.projection.includes('Moderate') ? '72%' : '48%' 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Suitability Badges */}
            <div className={styles.bestForSection}>
              <h3 className={styles.detailSectionTitle}>Best Suited For</h3>
              <div className={styles.bestForGrid}>
                <div className={styles.bestCategory}>
                  <span className={styles.bestLabel}>Seasons</span>
                  <div className={styles.badgeRow}>
                    {product.bestFor.seasons.map(s => (
                      <span key={s} className={styles.badge}>{s}</span>
                    ))}
                  </div>
                </div>
                <div className={styles.bestCategory}>
                  <span className={styles.bestLabel}>Time of Day</span>
                  <div className={styles.badgeRow}>
                    {product.bestFor.time.map(t => (
                      <span key={t} className={styles.badge}>{t}</span>
                    ))}
                  </div>
                </div>
                <div className={styles.bestCategory}>
                  <span className={styles.bestLabel}>Occasion</span>
                  <div className={styles.badgeRow}>
                    {product.bestFor.occasions.map(o => (
                      <span key={o} className={styles.badge}>{o}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Authenticity & WhatsApp support */}
            <div className={styles.features} style={{ borderTop: 'none', paddingTop: 0 }}>
              <div className={styles.featureItem}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                <div>
                  <h5>100% Authentic Quality</h5>
                  <p>Hand-poured luxury formulas with long-lasting premium ingredients.</p>
                </div>
              </div>
              <div className={styles.featureItem}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="3" width="15" height="13"></rect>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                  <circle cx="5.5" cy="18.5" r="2.5"></circle>
                  <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
                <div>
                  <h5>Direct WhatsApp Support</h5>
                  <p>Instant order updates and chat consulting via +91 90039 54228.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
