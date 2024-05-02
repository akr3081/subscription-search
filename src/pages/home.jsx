import React, { useState } from 'react';
import { getSearchResults, getSubscriptions } from '../common/utils';
import AppHeader from '../components/AppHeader/AppHeader.jsx';
import Gallery from '../components/Gallery/Gallery.jsx';
import SubscriptionSelector from '../components/SubscriptionSelector/SubscriptionSelector.jsx';
import useStore from '../stores/useStore.js';
import '../styles/global.css';
import styles from './home.module.css';

const HomePage = () => {
  const { apiKey, channelId, searchTerm, subscriptions, setApiKey, setChannelId, setSearchTerm, setSubscriptions } =
    useStore();

  const [isUserAuthenticated, setIsUserAuthenticated] = useState(apiKey && channelId);
  const [selectedSubscriptions, setSelectedSubscriptions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const handleSubmitAuth = async formData => {
    let isAuthenticated = false;

    try {
      const subs = await getSubscriptions({ apiKey: formData.apiKey, channelId: formData.channelId });
      setSubscriptions(subs);
      setApiKey(formData.apiKey);
      setChannelId(formData.channelId);
      setIsUserAuthenticated(true);
      isAuthenticated = true;
    } catch (err) {
      alert(`Subscription Error: ${err}`);
    }

    return isAuthenticated;
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
        isSearchEnabled={selectedSubscriptions?.length}
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
          isUserAuthenticated={isUserAuthenticated}
        />
      </div>

      <div className={styles.pageBody}>
        {searchResults?.map(channel => (
          <Gallery
            title={channel.title}
            image={channel.image}
            link={`https://www.youtube.com/@${channel.title}`}
            items={channel.items}
            showLoadMore={Boolean(channel.pageToken)}
            loadMoreItems={() => {
              loadMoreChannelVideos(channel);
            }}
            handleRemove={() => {
              handleRemoveChannel(channel?.id);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
