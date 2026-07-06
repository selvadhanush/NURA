'use client';

import { useState, useMemo } from 'react';
import styles from './page.module.css';
import { PRODUCTS, Product } from '../../data/products';
import { useCart } from '../../components/CartContext';
import Link from 'next/link';

type Preferences = {
  gender: string;
  vibe: string;
  intensity: string;
  season: string;
};

export default function Create() {
  const { addToCart, setIsCartOpen } = useCart();

  const [step, setStep] = useState(0);
  const [preferences, setPreferences] = useState<Preferences>({
    gender: '',
    vibe: '',
    intensity: '',
    season: '',
  });

  const [formats, setFormats] = useState<Record<string, 'perfume' | 'oil'>>({});
  const [showToast, setShowToast] = useState(false);
  const [addedProduct, setAddedProduct] = useState<Product | null>(null);

  const nextStep = () => setStep(prev => prev + 1);
  
  const resetQuiz = () => {
    setStep(0);
    setPreferences({ gender: '', vibe: '', intensity: '', season: '' });
    setFormats({});
  };

  const handleChoice = (key: keyof Preferences, value: string) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
    nextStep();
  };

  // Matching algorithm
  const recommendations = useMemo(() => {
    if (step < 4) return [];

    const scored = PRODUCTS.map(product => {
      let score = 0;

      // 1. Gender Match (Max 30 points)
      if (preferences.gender === 'Unisex') {
        score += 30; // Unisex preference matches anything
      } else if (product.gender === preferences.gender) {
        score += 30;
      } else if (product.gender === 'Unisex') {
        score += 25; // Unisex products are a very good match for anyone
      }

      // 2. Vibe Match (Max 30 points)
      if (preferences.vibe === 'Fresh & Light') {
        if (product.family === 'Fresh' || product.family === 'Citrus') {
          score += 30;
        } else if (product.family === 'Floral') {
          score += 20;
        }
      } else if (preferences.vibe === 'Warm & Spicy') {
        if (product.family === 'Spicy') {
          score += 30;
        } else if (product.family === 'Woody') {
          score += 20;
        }
      } else if (preferences.vibe === 'Deep & Woody') {
        if (product.family === 'Woody') {
          score += 30;
        } else if (product.family === 'Spicy') {
          score += 15;
        }
      } else if (preferences.vibe === 'Sweet & Gourmand') {
        if (product.family === 'Sweet') {
          score += 30;
        } else if (product.family === 'Floral') {
          score += 15;
        }
      }

      // 3. Intensity Match (Max 20 points)
      const projection = product.performance.projection;
      const longevity = product.performance.longevity;
      if (preferences.intensity === 'Subtle & Close') {
        if (projection.includes('Moderate')) score += 15;
        if (longevity.includes('Moderate') || longevity.includes('6-8')) score += 5;
      } else if (preferences.intensity === 'Moderate & Elegant') {
        if (projection.includes('Moderate') || projection.includes('Strong')) score += 10;
        if (longevity.includes('Long-lasting') || longevity.includes('8-10')) score += 10;
      } else if (preferences.intensity === 'Bold & Statement') {
        if (projection.includes('Strong')) score += 10;
        if (longevity.includes('Very Long-lasting') || longevity.includes('10+') || longevity.includes('12+')) score += 10;
      }

      // 4. Season Match (Max 20 points)
      const seasons = product.bestFor.seasons.map(s => s.toLowerCase());
      if (preferences.season === 'Spring/Summer Heat') {
        if (seasons.includes('summer') || seasons.includes('spring')) {
          score += 20;
        }
      } else if (preferences.season === 'Winter/Autumn Cozy') {
        if (seasons.includes('winter') || seasons.includes('autumn')) {
          score += 20;
        }
      } else if (preferences.season === 'All-Year Signature') {
        if (seasons.length >= 2) {
          score += 20;
        }
      }

      return { product, score: Math.min(100, score) };
    });

    // Sort by score descending and return those with score >= 50
    return scored
      .filter(item => item.score >= 50)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [preferences, step]);

  const handleFormatChange = (productId: string, format: 'perfume' | 'oil') => {
    setFormats(prev => ({ ...prev, [productId]: format }));
  };

  const handleAddToCart = (product: Product) => {
    const format = formats[product.id] || 'perfume';
    const size = format === 'perfume' ? '50ml' : '6ml';
    const price = format === 'perfume' ? product.perfumePrice50ml : product.oilPrice6ml;

    addToCart({
      productId: product.id,
      name: product.name,
      image: product.image,
      type: format,
      size,
      price
    }, 1);

    setAddedProduct(product);
    setShowToast(true);
  };

  const handleToastAction = () => {
    setShowToast(false);
    setIsCartOpen(true);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className={styles.page}>
      {/* Toast Notification */}
      {showToast && addedProduct && (
        <div className={styles.toastContainer}>
          <div className={styles.toastCard}>
            <img src={addedProduct.image} alt={addedProduct.name} className={styles.toastImage} />
            <div className={styles.toastInfo}>
              <span className={styles.toastTitle}>Added to Cart</span>
              <h4 className={styles.toastName}>{addedProduct.name}</h4>
              <p className={styles.toastMeta}>
                {formats[addedProduct.id] === 'oil' ? 'Concentrated Oil — 6ml' : 'Eau de Parfum — 50ml'} (1x)
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

      <div className={styles.header}>
        <h1>FRAGRANCE FINDER</h1>
        <p className={styles.subtitle}>Our Guided Scent Discovery Journey</p>
      </div>

      <div className={styles.container}>
        {/* Progress Bar */}
        {step < 4 && (
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFilled} 
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        )}

        {/* Step 0: Gender */}
        {step === 0 && (
          <div className={styles.quizStep}>
            <h2>Who will wear this fragrance?</h2>
            <p className={styles.quizStepSubtitle}>Select your gender profile preference</p>
            <div className={styles.optionsGrid}>
              <button className={styles.optionButton} onClick={() => handleChoice('gender', 'Women')}>
                For Her
                <span className={styles.optionDesc}>Feminine blossom, dewy, and orchid profiles</span>
              </button>
              <button className={styles.optionButton} onClick={() => handleChoice('gender', 'Men')}>
                For Him
                <span className={styles.optionDesc}>Bold spices, deep woods, and classic agarwood</span>
              </button>
              <button className={styles.optionButton} onClick={() => handleChoice('gender', 'Unisex')}>
                Shared (Unisex)
                <span className={styles.optionDesc}>Balanced profiles loved by all genders</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 1: Vibe */}
        {step === 1 && (
          <div className={styles.quizStep}>
            <h2>What vibe defines you?</h2>
            <p className={styles.quizStepSubtitle}>Choose the scent family focus</p>
            <div className={styles.optionsGrid}>
              <button className={styles.optionButton} onClick={() => handleChoice('vibe', 'Fresh & Light')}>
                Fresh & Clean
                <span className={styles.optionDesc}>Crisp citrus notes and light dewy florals</span>
              </button>
              <button className={styles.optionButton} onClick={() => handleChoice('vibe', 'Warm & Spicy')}>
                Warm & Spicy
                <span className={styles.optionDesc}>Intense cardamoms, cinnamon, and rich resins</span>
              </button>
              <button className={styles.optionButton} onClick={() => handleChoice('vibe', 'Deep & Woody')}>
                Rich & Woody
                <span className={styles.optionDesc}>Aged agarwood (Oud), cedar, and amber</span>
              </button>
              <button className={styles.optionButton} onClick={() => handleChoice('vibe', 'Sweet & Gourmand')}>
                Sweet & Gourmand
                <span className={styles.optionDesc}>Creamy vanilla, dates, praline, and desserts</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Intensity */}
        {step === 2 && (
          <div className={styles.quizStep}>
            <h2>How would you describe your ideal projection?</h2>
            <p className={styles.quizStepSubtitle}>Select the intensity level</p>
            <div className={styles.optionsGrid}>
              <button className={styles.optionButton} onClick={() => handleChoice('intensity', 'Subtle & Close')}>
                Subtle & Close
                <span className={styles.optionDesc}>Leaves an intimate, personal scent trail</span>
              </button>
              <button className={styles.optionButton} onClick={() => handleChoice('intensity', 'Moderate & Elegant')}>
                Moderate & Elegant
                <span className={styles.optionDesc}>Sleek presence suitable for daily office wear</span>
              </button>
              <button className={styles.optionButton} onClick={() => handleChoice('intensity', 'Bold & Statement')}>
                Bold & Statement
                <span className={styles.optionDesc}>Fills rooms, commands attention, and lasts all day</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Season */}
        {step === 3 && (
          <div className={styles.quizStep}>
            <h2>Which season are you matching?</h2>
            <p className={styles.quizStepSubtitle}>Fragrances bloom differently in warm vs. cool weather</p>
            <div className={styles.optionsGrid}>
              <button className={styles.optionButton} onClick={() => handleChoice('season', 'Spring/Summer Heat')}>
                Summer & Spring
                <span className={styles.optionDesc}>Lighter, evaporating nicely in warm days</span>
              </button>
              <button className={styles.optionButton} onClick={() => handleChoice('season', 'Winter/Autumn Cozy')}>
                Winter & Autumn
                <span className={styles.optionDesc}>Cozy, thick notes that warm up cold nights</span>
              </button>
              <button className={styles.optionButton} onClick={() => handleChoice('season', 'All-Year Signature')}>
                All-Year Round
                <span className={styles.optionDesc}>Versatile signatures perfect for any climate</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Results */}
        {step === 4 && (
          <div className={styles.resultsContainer}>
            <h2>YOUR FRAGRANCE PROFILE MATCHES</h2>
            <p className={styles.resultsSubtitle}>Based on your choices, we recommend these curated creations:</p>

            {recommendations.length > 0 ? (
              <div className={styles.resultsGrid}>
                {recommendations.map(({ product, score }) => {
                  const format = formats[product.id] || 'perfume';
                  const price = format === 'perfume' ? product.perfumePrice50ml : product.oilPrice6ml;

                  return (
                    <div key={product.id} className={styles.recommendedCard}>
                      <span className={styles.matchScoreBadge}>{score}% MATCH</span>
                      
                      <div className={styles.productImageWrapper}>
                        <img src={product.image} alt={product.name} className={styles.productImg} />
                      </div>

                      <h3>{product.name}</h3>
                      <span className={styles.recommendedFamily}>{product.family} • {product.gender}</span>
                      
                      <p className={styles.recommendedDesc}>{product.description}</p>

                      <div className={styles.notesWrapper}>
                        <div className={styles.noteItem}>
                          <span className={styles.noteLabel}>Top:</span> {product.notes.top}
                        </div>
                        <div className={styles.noteItem}>
                          <span className={styles.noteLabel}>Heart:</span> {product.notes.heart}
                        </div>
                        <div className={styles.noteItem}>
                          <span className={styles.noteLabel}>Base:</span> {product.notes.base}
                        </div>
                      </div>

                      {/* Format selection */}
                      <div className={styles.formatSelector}>
                        <button 
                          className={`${styles.formatBtn} ${format === 'perfume' ? styles.formatBtnActive : ''}`}
                          onClick={() => handleFormatChange(product.id, 'perfume')}
                        >
                          Eau de Parfum (50ml)
                        </button>
                        <button 
                          className={`${styles.formatBtn} ${format === 'oil' ? styles.formatBtnActive : ''}`}
                          onClick={() => handleFormatChange(product.id, 'oil')}
                        >
                          Perfume Oil (6ml)
                        </button>
                      </div>

                      <button 
                        className={styles.addToCartBtn}
                        onClick={() => handleAddToCart(product)}
                      >
                        ADD TO CART — {formatCurrency(price)}
                      </button>

                      <Link href={`/products/${product.id}`} className={styles.exploreLink}>
                        EXPLORE FRAGRANCE DETAILS
                      </Link>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className={styles.noResults}>
                <p>We couldn't find a perfect match for that combination. Here are our house favorites:</p>
                <div className={styles.resultsGrid}>
                  {PRODUCTS.filter(p => p.tags.includes('Signature')).slice(0, 2).map(product => (
                    <div key={product.id} className={styles.recommendedCard} style={{ minHeight: 'auto' }}>
                      <span className={styles.matchScoreBadge}>SIGNATURE</span>
                      <div className={styles.productImageWrapper}>
                        <img src={product.image} alt={product.name} className={styles.productImg} />
                      </div>
                      <h3>{product.name}</h3>
                      <span className={styles.recommendedFamily}>{product.family}</span>
                      <p className={styles.recommendedDesc}>{product.description}</p>
                      <Link href={`/products/${product.id}`} className={styles.addToCartBtn} style={{ textDecoration: 'none' }}>
                        EXPLORE SCENT
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button className={styles.resetButton} onClick={resetQuiz}>RETAKE SENSORY QUIZ</button>
          </div>
        )}
      </div>
    </div>
  );
}
