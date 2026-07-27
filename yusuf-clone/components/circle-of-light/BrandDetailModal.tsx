'use client';

import React, { useEffect } from 'react';
import { PartnerBrand } from './partnerData';
import NineStarLogo from './NineStarLogo';
import styles from './BrandDetailModal.module.css';

interface BrandDetailModalProps {
  brand: PartnerBrand | null;
  onClose: () => void;
}

export default function BrandDetailModal({ brand, onClose }: BrandDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (brand) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [brand, onClose]);

  if (!brand) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        {/* Modal Header */}
        <div className={styles.modalHeader}>
          <div className={styles.modalEmblem}>
            <NineStarLogo size={42} color="#e8d8a0" />
          </div>
          <div>
            <span className={styles.modalCategory}>✦ {brand.category}</span>
            <h2 className={styles.modalTitle}>{brand.name}</h2>
            <p className={styles.modalTagline}>{brand.tagline}</p>
          </div>
        </div>

        {/* Hero Quote */}
        <blockquote className={styles.heroQuote}>
          "{brand.detailedStory.heroQuote}"
        </blockquote>

        {/* Story Sections */}
        <div className={styles.sectionsList}>
          {brand.detailedStory.sections.map((sec, idx) => (
            <div key={idx} className={styles.storyBlock}>
              <h3>{sec.title}</h3>
              <p>{sec.text}</p>
            </div>
          ))}
        </div>

        {/* Fragrance Notes Summary */}
        <div className={styles.modalNotesBlock}>
          <h3>Fragrance Pyramid Composition</h3>
          <div className={styles.notesRow}>
            <div>
              <strong>TOP:</strong> {brand.notes.top.join(', ')}
            </div>
            <div>
              <strong>HEART:</strong> {brand.notes.heart.join(', ')}
            </div>
            <div>
              <strong>BASE:</strong> {brand.notes.base.join(', ')}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className={styles.modalFooter}>
          <button className={styles.closeCtaBtn} onClick={onClose}>
            CLOSE DISCOVERY
          </button>
        </div>
      </div>
    </div>
  );
}
