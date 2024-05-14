import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
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
const SubscriptionSelector = ({
  subscriptions,
  selectedSubscriptions,
  setSelectedSubscriptions,
  handleRefresh,
  isUserAuthenticated
}) => {
  const [isLoadingSubscriptions, setIsLoadingSubscriptions] = useState(false);

  const sortedItems = subscriptions.sort((a, b) => a?.snippet?.title?.localeCompare(b.snippet.title));

  const selected = sortedItems.filter(item => selectedSubscriptions.includes(item.id));
  const unSelected = sortedItems.filter(item => !selected.includes(item));

  const selectedCount = selectedSubscriptions?.length;
  const totalCount = subscriptions?.length;

  useEffect(() => {
    setIsLoadingSubscriptions(false);
  }, [subscriptions]);

  const handleSelect = subscription => {
    const channelId = subscription.id;
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

  return isUserAuthenticated ? (
    <div className={styles.subscriptionSelector}>
      <div className={styles.header}>
        <p>{`${SUBS_HEADER} (${selectedCount}/${totalCount})`}</p>
        <IconButton
          iconName="sync"
          className={styles.iconButton}
          onClick={handleRefreshClick}
          disabled={isLoadingSubscriptions}
        />
      </div>

      {subscriptions.length ? (
        <div className={styles.selections}>
          {selected.map((subscription, index) => (
            <SubscriptionCard
              name={subscription.snippet.title}
              image={subscription.snippet.thumbnails.default.url}
              isSelected={selectedSubscriptions.includes(subscription.id)}
              handleSelect={() => {
                handleSelect(subscription);
              }}
              key={`selected_sub_${index}`}
            />
          ))}

          {selected?.length ? <hr className={styles.divider} /> : null}

          {unSelected.map((subscription, index) => (
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
  handleRefresh: PropTypes.func,
  isUserAuthenticated: PropTypes.bool
};

SubscriptionSelector.defaultProps = {
  subscriptions: [],
  selectedSubscriptions: []
};

export default SubscriptionSelector;
