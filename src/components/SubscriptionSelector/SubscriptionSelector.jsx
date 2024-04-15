import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SubscriptionCard from './SubscriptionCard/SubscriptionCard.jsx';
import { SyncIcon } from '../Icon/Icon.jsx';
import styles from './SubscriptionSelector.module.css';

/**
 * Displays list of subscription cards to be selected
 * @param {array} subscriptions - List of all subscriptions
 * @param {array} selectedSubscriptions - List of selected channel ids
 * @param {function} setSelectedSubscriptions - Updates selectedSubscriptions state hook
 */
const SubscriptionSelector = ({ subscriptions, selectedSubscriptions, setSelectedSubscriptions, handleRefresh }) => {
  const [isLoadingSubscriptions, setIsLoadingSubscriptions] = useState(false);

  const sortedItems = subscriptions.sort((a, b) => a.snippet.title.localeCompare(b.snippet.title));

  const selected = sortedItems.filter(item => selectedSubscriptions.includes(item.snippet.resourceId.channelId));
  const unSelected = sortedItems.filter(item => !selected.includes(item));

  const selectedCount = selectedSubscriptions?.length;
  const totalCount = subscriptions?.length;

  useEffect(() => {
    setIsLoadingSubscriptions(false);
  }, [subscriptions]);

  const handleSelect = subscription => {
    const channelId = subscription.snippet.resourceId.channelId;
    const isSelected = selectedSubscriptions.includes(channelId);
    let newSelectedSubs = [...selectedSubscriptions];

    if (isSelected) {
      newSelectedSubs = newSelectedSubs.filter(selectedSub => selectedSub !== channelId);
    } else {
      newSelectedSubs.push(channelId);
    }

    setSelectedSubscriptions(newSelectedSubs);
  };

  const handleRefreshClick = () => {
    setIsLoadingSubscriptions(true);
    handleRefresh();
  };

  return (
    <div className={styles.subscriptionSelector}>
      <div className={styles.header}>
        <p>{`Subscriptions to Search (${selectedCount}/${totalCount})`}</p>
        <button className={styles.iconButton} onClick={handleRefreshClick} disabled={isLoadingSubscriptions}>
          <SyncIcon />
        </button>
      </div>

      {subscriptions.length ? (
        <div className={styles.selections}>
          {selected.map(subscription => (
            <SubscriptionCard
              name={subscription.snippet.title}
              image={subscription.snippet.thumbnails.default.url}
              isSelected={selectedSubscriptions.includes(subscription.snippet.resourceId.channelId)}
              handleSelect={() => {
                handleSelect(subscription);
              }}
            />
          ))}

          {selected?.length ? <hr className={styles.divider} /> : null}

          {unSelected.map(subscription => (
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
      ) : (
        <div>Please enter a valid API Key and Channel ID to view your subscriptions</div>
      )}
    </div>
  );
};

SubscriptionSelector.propTypes = {
  subscriptions: PropTypes.arrayOf(PropTypes.object),
  selectedSubscriptions: PropTypes.arrayOf(PropTypes.string),
  setSelectedSubscriptions: PropTypes.func,
  handleRefresh: PropTypes.func
};

SubscriptionSelector.defaultProps = {
  subscriptions: [],
  selectedSubscriptions: []
};

export default SubscriptionSelector;
