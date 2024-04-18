import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { getSearchResults, getSubscriptions } from './common/utils';
import AppHeader from './components/AppHeader/AppHeader.jsx';
import Gallery from './components/Gallery/Gallery.jsx';
import SubscriptionSelector from './components/SubscriptionSelector/SubscriptionSelector.jsx';
import useStore from './stores/useStore.js';
import './styles/global.css';
import styles from './index.module.css';

const Home = () => {
  const { apiKey, channelId, searchTerm, subscriptions, setApiKey, setChannelId, setSearchTerm, setSubscriptions } =
    useStore();

  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [selectedSubscriptions, setSelectedSubscriptions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (apiKey && channelId) {
      setIsUserAuthenticated(true);
    }
  }, []);

  const handleSubmitAuth = formData => {
    setIsUserAuthenticated(false);

    getSubscriptions({ apiKey: formData.apiKey, channelId: formData.channelId })
      .then(res => {
        setSubscriptions(res);

        setApiKey(formData.apiKey);
        setChannelId(formData.channelId);
        setIsUserAuthenticated(true);
      })
      .catch(err => {
        alert(`Subscription Error: ${err}`);

        setApiKey('');
        setChannelId('');
      });
  };

  const handleSubmitSearch = formData => {
    setSearchResults([]);

    getSearchResults({
      selectedSubscriptions,
      subscriptions,
      apiKey,
      searchTerm: formData.searchTerm
    })
      .then(results => {
        setSearchTerm(formData.searchTerm);
        setSearchResults(results);
      })
      .catch(err => {
        alert(`Search Error: ${err}`);
      });
  };

  const loadMoreChannelVideos = channel => {
    const channelId = channel?.id;

    getSearchResults({
      selectedSubscriptions: [channelId],
      subscriptions,
      apiKey,
      searchTerm,
      pageToken: channel.pageToken
    })
      .then(results => {
        const oldChannelResults = searchResults.find(channelRes => channelRes.id === channelId);
        const newChannelResults = results.find(channelRes => channelRes.id === channelId);
        const updatedChannelResults = {
          ...newChannelResults,
          items: [...oldChannelResults.items, ...newChannelResults.items]
        };

        const newResults = searchResults.map(channelRes =>
          channelRes.id === channelId ? updatedChannelResults : channelRes
        );

        setSearchResults(newResults);
      })
      .catch(err => {
        alert(`Load More Error: ${err}`);
      });
  };

  const handleRemoveChannel = channelId => {
    // FIXME: Add this once empty channel gallerys are added
    // const newSelectedSubscriptions = selectedSubscriptions.filter(sub => sub !== channelId);
    // setSelectedSubscriptions(newSelectedSubscriptions)

    const newResults = searchResults?.filter(channelResult => channelResult.id !== channelId);
    setSearchResults(newResults);
  };

  return (
    <div className={styles.home}>
      <AppHeader
        handleSubmitAuth={handleSubmitAuth}
        handleSubmitSearch={handleSubmitSearch}
        isUserAuthenticated={isUserAuthenticated}
        className={styles.header}
      />

      <div className={styles.leftRail}>
        <SubscriptionSelector
          subscriptions={subscriptions}
          selectedSubscriptions={selectedSubscriptions}
          setSelectedSubscriptions={setSelectedSubscriptions}
          handleRefresh={() => {
            setSelectedSubscriptions([]);
            handleSubmitAuth({ apiKey, channelId });
          }}
        />
      </div>

      <div className={styles.pageBody}>
        {searchResults?.map(channel => (
          <Gallery
            title={channel.title}
            image={channel.image}
            link={`https://www.youtube.com/@${channel.title}`}
            items={channel.items}
            loadMoreItems={() => {
              loadMoreChannelVideos(channel);
            }}
            handleRemove={() => { handleRemoveChannel(channel?.id); }}
          />
        ))}
      </div>
    </div>
  );
};

render(<Home />, document.getElementById('root'));
