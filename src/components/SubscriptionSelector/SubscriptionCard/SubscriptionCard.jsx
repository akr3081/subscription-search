import React from 'react';
import { AddIcon, SubtractIcon } from '../../Icon/Icon.jsx';
import styles from './SubscriptionCard.module.css';

const SubscriptionCard = ({ name, image, isSelected, handleSelect }) => {
  return (
    <div className={styles.subscriptionCard}>
      <span className={styles.channel}>
        <img src={image} alt={name} referrerPolicy="no-referrer" />
        <h4>{name}</h4>
      </span>

      <button onClick={handleSelect} className={`${styles.button} ${isSelected && styles.isSelected}`}>
        {isSelected ? <SubtractIcon /> : <AddIcon />}
      </button>
    </div>
  );
};

export default SubscriptionCard;
