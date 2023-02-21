import React from 'react';
import styles from './SubscriptionSelector.module.css';
import SubscriptionCard from './SubscriptionCard/SubscriptionCard.jsx';

const SubscriptionSelector = ({ subscriptions }) => {
  const handleSelect = (subscription) => {
    console.log(subscription);
  };

  return (
    <div className={styles.subscriptionSelector}>
      <div className={styles.selections}>
        {subscriptions.map((subscription) => (
            <SubscriptionCard
                name={subscription.snippet.title}
                image={subscription.snippet.thumbnails.default.url}
                handleSelect={() => {
                  handleSelect(subscription);
                }}
            />
        ))}
      </div>
    </div>
  );
};

export default SubscriptionSelector;
