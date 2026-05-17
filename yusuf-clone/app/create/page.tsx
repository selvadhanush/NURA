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
  { id: 'summer-oud', name: 'SUMMER OUD', type: 'perfume', profiles: ['Woody', 'Rich'], occasions: ['Special Event', 'Evening'], intensity: 'Bold & Intense', price: '2,850.00', image: '/products/summer_oud.png' },
  { id: 'canadian-lemon', name: 'CANADIAN LEMON', type: 'perfume', profiles: ['Fresh & Citrus'], occasions: ['Everyday Wear', 'Professional Setting'], intensity: 'Subtle & Light', price: '2,450.00', image: '/products/canadian_lemon.png' },
  { id: 'tam-dao', name: 'TAM DAO', type: 'perfume', profiles: ['Woody'], occasions: ['Relaxing at Home', 'Everyday Wear'], intensity: 'Long-lasting', price: '3,200.00', image: '/products/tam_dao.png' },
  { id: 'jasmine', name: 'JASMINE OIL', type: 'oil', profiles: ['Sweet & Floral'], occasions: ['Special Event', 'Everyday Wear'], intensity: 'Long-lasting', price: '450.00', image: '/products/jasmine_oil.png' },
  { id: 'al-zaf', name: 'AL ZAF', type: 'oil', profiles: ['Rich & Spicy'], occasions: ['Special Event'], intensity: 'Bold & Intense', price: '550.00', image: '/products/al_zaf.png' },
  { id: 'al-haroon', name: 'AL HAROON', type: 'oil', profiles: ['Rich & Spicy', 'Woody'], occasions: ['Special Event', 'Professional Setting'], intensity: 'Bold & Intense', price: '600.00', image: '/products/al_haroon.png' },
  { id: 'latafa-khamrah', name: 'LATAFA KHAMRAH', type: 'oil', profiles: ['Sweet & Floral', 'Rich & Spicy'], occasions: ['Special Event', 'Evening'], intensity: 'Bold & Intense', price: '750.00', image: '/products/latafa_khamrah.png' },
  { id: 'almarziyah', name: 'ALMARZIYAH', type: 'oil', profiles: ['Fresh & Citrus', 'Woody'], occasions: ['Everyday Wear', 'Professional Setting'], intensity: 'Long-lasting', price: '650.00', image: '/products/almarziyah.png' },
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
                   <ProductCard name="SUMMER OUD" price="2,850.00" imageUrl="/products/summer_oud.png" link="/perfume" />
                   <ProductCard name="AL ZAF" price="550.00" imageUrl="/products/al_zaf.png" link="/perfume-oil" />
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
