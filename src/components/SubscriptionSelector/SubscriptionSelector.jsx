import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useStore from '../../stores/useStore.js';
import IconButton from '../IconButton/IconButton.jsx';
import SubscriptionCard from '../SubscriptionCard/SubscriptionCard.jsx';
import { MISSING_SUBS_LABEL, SUBS_HEADER } from '../../common/constants.js';
import styles from './SubscriptionSelector.module.css';

/**
 * Displays list of subscription cards to be selected
 * @param {array} subscriptions - List of all subscriptions
 * @param {array} selectedSubscriptions - List of selected channel ids
 * @param {function} setSelectedSubscriptions - Updates selectedSubscriptions state hook
 */
const SubscriptionSelector = ({ subscriptions, selectedSubscriptions, setSelectedSubscriptions, handleRefresh }) => {
  const { userData } = useStore();
  const [isLoadingSubscriptions, setIsLoadingSubscriptions] = useState(false);
  const [filter, setFilter] = useState('');

  const sortedItems = subscriptions.sort((a, b) => a?.snippet?.title?.localeCompare(b.snippet.title));
  const unSelected = sortedItems.filter(item => !selectedSubscriptions.includes(item.id));

  const selectedCount = selectedSubscriptions?.length;
  const totalCount = subscriptions?.length;

  useEffect(() => {
    setIsLoadingSubscriptions(false);
  }, [subscriptions]);

  const handleSelect = subscription => {
    const newSelectedSubs = [...selectedSubscriptions, subscription.id];
    setSelectedSubscriptions(newSelectedSubs);
  };

  const handleRefreshClick = () => {
    setIsLoadingSubscriptions(true);
    handleRefresh();
  };

  return userData?.isUserAuthenticated ? (
    <div className={styles.subscriptionSelector}>
      <div className={styles.headerContainer}>
        <div className={styles.header}>
          <p>{`${SUBS_HEADER} (${selectedCount}/${totalCount})`}</p>
          <IconButton iconName="sync" onClick={handleRefreshClick} disabled={isLoadingSubscriptions} />
        </div>
        <input
          className={styles.filter}
          value={filter}
          placeholder="Filter Subscriptions"
          maxLength="50"
          onChange={e => {
            setFilter(e.target.value.toLowerCase());
          }}
        />
      </div>

      {subscriptions.length ? (
        <div className={styles.selections}>
          {unSelected
            .filter(sub => sub.snippet.title.toLowerCase().includes(filter))
            .map((subscription, index) => (
              <SubscriptionCard
                name={subscription.snippet.title}
                image={subscription.snippet.thumbnails.default.url}
                isSelected={selectedSubscriptions.includes(subscription.id)}
                handleSelect={() => {
                  handleSelect(subscription);
                }}
                key={`unselected_sub_${index}`}
              />
            ))}
        </div>
      ) : (
        <div>{MISSING_SUBS_LABEL}</div>
      )}
    </div>
  ) : null;
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
