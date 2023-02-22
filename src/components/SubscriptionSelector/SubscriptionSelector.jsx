import React from 'react';
import styles from './SubscriptionSelector.module.css';
import SubscriptionCard from './SubscriptionCard/SubscriptionCard.jsx';

const SubscriptionSelector = ({ subscriptions, selectedSubscriptions, setSelectedSubscriptions }) => {
  const handleSelect = (subscription) => {
    const channelId = subscription.snippet.resourceId.channelId;
    const isSelected = selectedSubscriptions.includes(channelId);
    let newSelectedSubs = [...selectedSubscriptions];

    if (isSelected) {
      newSelectedSubs = newSelectedSubs.filter((selectedSub) => selectedSub !== channelId);
    } else {
      newSelectedSubs.push(channelId);
    }

    setSelectedSubscriptions(newSelectedSubs);
  };

  return (
    <div className={styles.subscriptionSelector}>
      <div className={styles.selections}>
        {subscriptions.map((subscription) => (
          <SubscriptionCard
            name={subscription.snippet.title}
            image={subscription.snippet.thumbnails.default.url}
            isSelected={selectedSubscriptions.includes(subscription.snippet.resourceId.channelId)}
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
