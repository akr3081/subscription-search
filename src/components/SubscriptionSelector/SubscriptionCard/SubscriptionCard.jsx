import React from 'react';
import styles from './SubscriptionCard.module.css';
import { AddIcon, RemoveIcon } from '../../Icon/Icon.jsx';

const SubscriptionCard = ({ name, image, isSelected, handleSelect }) => {
  return (
    <div className={styles.subscriptionCard}>
      <span className={styles.channel}>
        <img src={image} alt={name} />
        <h3>{name}</h3>
      </span>

      <button onClick={handleSelect} className={`${styles.button} ${isSelected && styles.isSelected}`}>
        {isSelected ? <RemoveIcon /> : <AddIcon />}
      </button>
    </div>
  );
};

export default SubscriptionCard;
