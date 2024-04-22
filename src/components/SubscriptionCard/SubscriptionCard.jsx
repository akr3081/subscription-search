import React from 'react';
import IconButton from '../IconButton/IconButton.jsx';
import styles from './SubscriptionCard.module.css';

const SubscriptionCard = ({ name, image, isSelected, handleSelect }) => {
  return (
    <div className={styles.subscriptionCard}>
      <span className={styles.channel}>
        <img src={image} alt={name} referrerPolicy="no-referrer" />
        <h4>{name}</h4>
      </span>

      <IconButton
        iconName={isSelected ? 'subtract' : 'add'}
        className={`${styles.button} ${isSelected && styles.isSelected}`}
        onClick={handleSelect}
      />
    </div>
  );
};

export default SubscriptionCard;
