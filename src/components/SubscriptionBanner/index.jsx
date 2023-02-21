import React, { useState } from 'react';
import styles from './SubscriptionBanner.module.css';
import { ArrowIcon } from '../Icon/index.jsx';

const SubscriptionBanner = ({ title, description, resourceId, channelId, thumbnails }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = (e) => {
    if (e.keyCode && e.keyCode !== 13) return;
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className={styles.subscriptionBanner}>
      <div className={styles.header}>
        <ArrowIcon
          className={`${styles.icon} ${isOpen ? styles.iconOpen : styles.iconClosed}`}
          onClick={toggleIsOpen}
          onKeyDown={toggleIsOpen}
          tabIndex="0"
        />
        <a href={`https://youtube.com/channel/${resourceId.channelId}`}>
          <img src={thumbnails.default.url} alt={title} />
          <h3>{title}</h3>
        </a>
      </div>

      {isOpen && (
        <div className={styles.container}>
          <h4>{description}</h4>
        </div>
      )}
    </div>
  );
};

export default SubscriptionBanner;
