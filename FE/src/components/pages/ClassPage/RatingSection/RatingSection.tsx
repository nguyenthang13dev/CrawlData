'use client';

import React, { useState } from 'react';
import styles from './RatingSection.module.css';

interface RatingSectionProps {
  classId?: string;
  rating?: number;
  totalVotes?: number;
}

const RatingSection: React.FC<RatingSectionProps> = ({ 
  classId = '12', 
  rating = 3.6, 
  totalVotes = 1766 
}) => {
  const [currentRating, setCurrentRating] = useState<number | null>(null);
  const [hasRated, setHasRated] = useState(false);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleRating = async (value: number) => {
    if (!hasRated) {
      try {
        const response = await fetch('/categories/ajaxUpdateClassRating', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            class_id: classId,
            star_count: value,
          }),
        });
        const data = await response.json();
        if (data.success) {
          setCurrentRating(value);
          setHasRated(true);
        }
      } catch (error) {
        console.error('Error submitting rating:', error);
      }
    }
  };

  const displayRating = hoverRating || currentRating || rating;
  const ratingWidth = `${(displayRating / 5) * 100}%`;

  return (
    <div className={styles.ratingSection}>
      <div className={styles.starRatings}>
        <span className={styles.voteTitle}>Bình chọn: </span>
        <div
          className={styles.kkstars}
          onMouseLeave={() => setHoverRating(null)}
        >
          <div
            className={styles.kkFuel}
            style={{ width: ratingWidth }}
          />
          {[1, 2, 3, 4, 5].map((star) => (
            <a
              key={star}
              href="javascript:void(0)"
              data-rating-val={star}
              onMouseEnter={() => !hasRated && setHoverRating(star)}
              onClick={(e) => {
                e.preventDefault();
                handleRating(star);
              }}
              title={`${star} sao`}
            />
          ))}
        </div>
      </div>

      {hasRated && <p className={styles.thankYou}>Cảm ơn bạn đã vote</p>}

      {!hasRated && (
        <div className={styles.ratingInfo}>
          <span>{rating}</span>
          <span>trên</span>
          <span>{totalVotes}</span>
          <span>phiếu</span>
        </div>
      )}
    </div>
  );
};

export default RatingSection;
