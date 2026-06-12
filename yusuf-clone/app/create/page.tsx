'use client';

import { useState } from 'react';
import styles from './page.module.css';
import ProductCard from '../../components/ProductCard';

type Preference = {
  profile: string;
  occasion: string;
  intensity: string;
};

const PRODUCTS = [
  // Perfumes
  { id: 'jasmine-perfume', name: 'Jasmine', type: 'perfume', profiles: ['Sweet & Floral'], occasions: ['Everyday Wear', 'Special Event'], intensity: 'Long-lasting', price: '2,590.00', image: '/products/jasmine_oil.png' },
  { id: 'al-zaf-perfume', name: 'AL-ZAF', type: 'perfume', profiles: ['Rich & Spicy', 'Woody'], occasions: ['Special Event', 'Evening'], intensity: 'Bold & Intense', price: '2,390.00', image: '/products/al_zaf.png' },
  { id: 'al-harun-perfume', name: 'Al Harun V1', type: 'perfume', profiles: ['Rich & Spicy', 'Woody'], occasions: ['Special Event', 'Professional Setting'], intensity: 'Bold & Intense', price: '2,990.00', image: '/products/al_haroon.png' },
  { id: 'latafa-khamrah-perfume', name: 'Lattafa Khamrah V1', type: 'perfume', profiles: ['Sweet & Floral', 'Rich & Spicy'], occasions: ['Special Event', 'Evening'], intensity: 'Bold & Intense', price: '3,090.00', image: '/products/latafa_khamrah.png' },
  { id: 'al-marziyah-perfume', name: 'Al Marziyah', type: 'perfume', profiles: ['Fresh & Citrus', 'Woody'], occasions: ['Everyday Wear', 'Professional Setting'], intensity: 'Long-lasting', price: '2,890.00', image: '/products/almarziyah.png' },
  // Oils
  { id: 'jasmine-oil', name: 'Jasmine Oil', type: 'oil', profiles: ['Sweet & Floral'], occasions: ['Everyday Wear', 'Special Event'], intensity: 'Long-lasting', price: '569.00', image: '/products/jasmine_oil.png' },
  { id: 'al-zaf-oil', name: 'AL-ZAF Oil', type: 'oil', profiles: ['Rich & Spicy', 'Woody'], occasions: ['Special Event', 'Evening'], intensity: 'Bold & Intense', price: '520.00', image: '/products/al_zaf.png' },
  { id: 'al-harun-oil', name: 'Al Harun V1 Oil', type: 'oil', profiles: ['Rich & Spicy', 'Woody'], occasions: ['Special Event', 'Professional Setting'], intensity: 'Bold & Intense', price: '710.00', image: '/products/al_haroon.png' },
  { id: 'latafa-khamrah-oil', name: 'Lattafa Khamrah V1 Oil', type: 'oil', profiles: ['Sweet & Floral', 'Rich & Spicy'], occasions: ['Special Event', 'Evening'], intensity: 'Bold & Intense', price: '729.00', image: '/products/latafa_khamrah.png' },
  { id: 'al-marziyah-oil', name: 'Al Marziyah Oil', type: 'oil', profiles: ['Fresh & Citrus', 'Woody'], occasions: ['Everyday Wear', 'Professional Setting'], intensity: 'Long-lasting', price: '680.00', image: '/products/almarziyah.png' },
];

export default function Create() {
  const [step, setStep] = useState(0);
  const [preferences, setPreferences] = useState<Preference>({
    profile: '',
    occasion: '',
    intensity: '',
  });

  const nextStep = () => setStep(prev => prev + 1);
  const resetQuiz = () => {
    setStep(0);
    setPreferences({ profile: '', occasion: '', intensity: '' });
  };

  const handleChoice = (key: keyof Preference, value: string) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
    nextStep();
  };

  const getSuggestions = () => {
    return PRODUCTS.filter(product => {
      const matchProfile = product.profiles.includes(preferences.profile);
      const matchOccasion = product.occasions.includes(preferences.occasion);
      const matchIntensity = product.intensity === preferences.intensity;
      
      // Return true if at least two criteria match for better results
      const matchCount = [matchProfile, matchOccasion, matchIntensity].filter(Boolean).length;
      return matchCount >= 2;
    }).slice(0, 3); // Return top 3 suggestions
  };

  const suggestions = getSuggestions();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>CHOOSE YOUR FRAGRANCE</h1>
        <p className={styles.subtitle}>Discover the scent that defines you</p>
      </div>
      
      <div className={styles.container}>
        {step === 0 && (
          <div className={styles.quizStep}>
            <h2>What's your preferred scent profile?</h2>
            <div className={styles.optionsGrid}>
              {['Fresh & Citrus', 'Woody', 'Sweet & Floral', 'Rich & Spicy'].map(option => (
                <button key={option} className={styles.optionButton} onClick={() => handleChoice('profile', option)}>
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className={styles.quizStep}>
            <h2>What is the occasion?</h2>
            <div className={styles.optionsGrid}>
              {['Everyday Wear', 'Special Event', 'Professional Setting', 'Relaxing at Home'].map(option => (
                <button key={option} className={styles.optionButton} onClick={() => handleChoice('occasion', option)}>
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className={styles.quizStep}>
            <h2>How intense should it be?</h2>
            <div className={styles.optionsGrid}>
              {['Subtle & Light', 'Long-lasting', 'Bold & Intense'].map(option => (
                <button key={option} className={styles.optionButton} onClick={() => handleChoice('intensity', option)}>
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className={styles.resultsContainer}>
            <h2>OUR RECOMMENDATIONS FOR YOU</h2>
            {suggestions.length > 0 ? (
              <div className={styles.resultsGrid}>
                {suggestions.map(product => (
                  <ProductCard 
                    key={product.id}
                    name={product.name}
                    price={product.price}
                    imageUrl={product.image}
                    link={product.type === 'perfume' ? '/perfume' : '/perfume-oil'}
                  />
                ))}
              </div>
            ) : (
              <div className={styles.noResults}>
                <p>We couldn't find a perfect match, but you might love these classics:</p>
                <div className={styles.resultsGrid}>
                    <ProductCard name="Jasmine" price="2,590.00" imageUrl="/products/jasmine_oil.png" link="/perfume" />
                    <ProductCard name="AL-ZAF" price="520.00" imageUrl="/products/al_zaf.png" link="/perfume-oil" />
                </div>
              </div>
            )}
            <button className={styles.resetButton} onClick={resetQuiz}>RETAKE QUIZ</button>
          </div>
        )}
      </div>
    </div>
  );
}
