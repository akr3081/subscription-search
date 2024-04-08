import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import AppHeader from './components/AppHeader/AppHeader.jsx';
import SubscriptionSelector from './components/SubscriptionSelector/SubscriptionSelector.jsx';
import VideoCard from './components/VideoCard/VideoCard.jsx';
import { getAllVideos, getSubscriptions } from './common/utils';
import styles from './index.module.css';

const Home = () => {
  const [userData, setUserData] = useState({ apiKey: '', channelId: '' });
  const [subscriptions, setSubscriptions] = useState([]);
  const [selectedSubscriptions, setSelectedSubscriptions] = useState([]);
  const [videos, setVideos] = useState([]);

  const handleSubmitAuth = formData => {
    setUserData(formData);

    getSubscriptions({ ...formData })
      .then(res => {
        setSubscriptions(res);
      })
      .catch(err => {
        console.log('Subscriptions error', err);
      });
  };

  const handleSubmitSearch = formData => {
    setVideos([]);

    getAllVideos({
      subscriptionIds: selectedSubscriptions,
      apiKey: userData.apiKey,
      searchTerm: formData.searchTerm,
      maxResultsPerChannel: formData.maxResults
    }).then(videos => {
      setVideos(videos);
    });
  };

  return (
    <div className={styles.home}>
      <AppHeader
        userData={userData}
        handleSubmitAuth={handleSubmitAuth}
        handleSubmitSearch={handleSubmitSearch}
        className={styles.header}
      />

      <div className={styles.leftRail}>
        <SubscriptionSelector
          subscriptions={subscriptions}
          selectedSubscriptions={selectedSubscriptions}
          setSelectedSubscriptions={setSelectedSubscriptions}
        />
      </div>

      <div className={styles.pageBody}>
        {videos.map(video => (
          <VideoCard {...video.snippet} videoId={video.id.videoId} />
        ))}
      </div>
    </div>
  );
};

render(<Home />, document.getElementById('root'));
