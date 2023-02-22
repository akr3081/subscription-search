import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import AuthHeader from './components/AuthHeader/index.jsx';
import SearchForm from './components/SearchForm/SearchForm.jsx';
import SubscriptionSelector from './components/SubscriptionSelector/SubscriptionSelector.jsx';
import SubscriptionsMock from './__mocks__/subscriptions.json';
import VideoMock from './__mocks__/channelVideos.json';
import { getSubscriptions } from './common/utils';
import styles from './index.module.css';

const Home = () => {
  const [userData, setUserData] = useState({ apiKey: '', channelId: '' });
  const [subscriptions, setSubscriptions] = useState([]);
  const [selectedSubscriptions, setSelectedSubscriptions] = useState([]);

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
      <AuthHeader userData={userData} handleSubmitAuth={handleSubmitAuth} className={styles.header} />

      <div className={styles.leftRail}>
        <SubscriptionSelector
          subscriptions={SubscriptionsMock.items}
          selectedSubscriptions={selectedSubscriptions}
          setSelectedSubscriptions={setSelectedSubscriptions}
        />
      </div>

      <div className={styles.pageBody} />
    </div>
  );
};

render(<Home />, document.getElementById('root'));
