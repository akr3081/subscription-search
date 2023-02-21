import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import AuthHeader from './components/AuthHeader/index.jsx';
import SearchForm from './components/SearchForm/index.jsx';
import SubscriptionBanner from './components/SubscriptionBanner/index.jsx';
import { getSubscriptions } from './common/utils';
import styles from './index.module.css';

const Home = () => {
  const [userData, setUserData] = useState({ apiKey: '', channelId: '' });
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    if (userData.apiKey && subscriptions.length === 0) {
      getSubscriptions({ ...userData })
        .then((res) => {
          setSubscriptions(res);
        })
        .catch((err) => {
          console.log('Subscriptions error', err);
        });
    }
  }, [userData.apiKey]);

  const handleSubmitAuth = ({ apiKey, channelId }) => {
    setUserData({ apiKey, channelId });
  };

  return (
    <div className={styles.home}>
      <h1>Subscription Search</h1>

      <AuthHeader userData={userData} handleSubmitAuth={handleSubmitAuth} />

      <SearchForm userData={userData} />

      <div className={styles.subscriptionsContainer}>
        {subscriptions.map((subscription) => (
          <SubscriptionBanner {...subscription.snippet} />
        ))}
      </div>
    </div>
  );
};

render(<Home />, document.getElementById('root'));
