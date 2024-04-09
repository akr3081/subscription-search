import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { getSearchResults, getSubscriptions } from './common/utils';
import AppHeader from './components/AppHeader/AppHeader.jsx';
import Gallery from './components/Gallery/Gallery.jsx';
import SubscriptionSelector from './components/SubscriptionSelector/SubscriptionSelector.jsx';
import useStore from './stores/useStore.js';
import styles from './index.module.css';

const Home = () => {
  const { apiKey, channelId, setApiKey, setChannelId } = useStore();

  const [subscriptions, setSubscriptions] = useState([]);
  const [selectedSubscriptions, setSelectedSubscriptions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (apiKey && channelId && subscriptions?.length === 0) {
      handleSubmitAuth({ apiKey, channelId });
    }
  }, []);

  const handleSubmitAuth = formData => {
    setApiKey(formData.apiKey);
    setChannelId(formData.channelId);

    getSubscriptions({ apiKey: formData.apiKey, channelId: formData.channelId })
      .then(res => {
        setSubscriptions(res);
      })
      .catch(err => {
        console.log('Subscriptions error', err);
      });
  };

  const handleSubmitSearch = formData => {
    setSearchResults([]);

    getSearchResults({
      selectedSubscriptions,
      subscriptions,
      apiKey,
      searchTerm: formData.searchTerm,
      maxResultsPerChannel: formData.maxResults
    })
      .then(results => {
        setSearchResults(results);
      })
      .catch(err => {
        console.log('Search error', err);
      });
  };

  return (
    <div className={styles.home}>
      <AppHeader
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
        {searchResults?.map(channel => (
          <Gallery title={channel.title} image={channel.image} items={channel.items} />
        ))}
      </div>
    </div>
  );
};

render(<Home />, document.getElementById('root'));
