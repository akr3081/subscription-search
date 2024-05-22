import React, { useEffect, useState } from 'react';
import { getSearchResults, getSubscriptions } from '../common/utils';
import AppHeader from '../components/AppHeader/AppHeader.jsx';
import LoginBanner from '../components/LoginBanner/LoginBanner.jsx';
import Gallery from '../components/Gallery/Gallery.jsx';
import SubscriptionSelector from '../components/SubscriptionSelector/SubscriptionSelector.jsx';
import useStore from '../stores/useStore.js';
import { THEMES } from '../common/constants.js';
import '../styles/global.css';
import styles from './home.module.css';

const HomePage = () => {
  const {
    history,
    searchResults,
    searchTerm,
    selectedSubscriptions,
    subscriptions,
    theme,
    userData,
    setHistory,
    setSearchResults,
    setSearchTerm,
    setSelectedSubscriptions,
    setSubscriptions,
    setUserData
  } = useStore();

  const [isLoadingSearch, setIsLoadingSearch] = useState(false);

  // Special case for setting values of root element values based on theme state
  useEffect(() => {
    document.documentElement.style.setProperty('background', theme === THEMES.DARK ? 'black' : 'white');
  }, [theme]);

  const handleSubmitAuth = async formData => {
    let isAuthenticated = false;

    try {
      const { subscriptions, userData } = await getSubscriptions({
        apiKey: formData.apiKey,
        channelId: formData.channelId
      });
      setSubscriptions(subscriptions);
      setUserData({ ...userData, isUserAuthenticated: true });
      isAuthenticated = true;
    } catch (err) {
      alert(`Subscription Error: ${err}`);
    }

    return isAuthenticated;
  };

  const handleSubmitSearch = formData => {
    setIsLoadingSearch(true);
    const selectedSubs = formData?.selectedSubscriptions ?? selectedSubscriptions;
    setSearchResults([]);

    getSearchResults({
      selectedSubscriptions: selectedSubs,
      subscriptions,
      apiKey: userData.apiKey,
      searchTerm: formData.searchTerm
    })
      .then(results => {
        setIsLoadingSearch(false);
        setSelectedSubscriptions(selectedSubs);
        setSearchTerm(formData.searchTerm);
        setSearchResults(results);
        if (results.length)
          setHistory([
            { timestamp: new Date().getTime(), searchTerm: formData.searchTerm, selectedSubscriptions: selectedSubs },
            ...history
          ]);
      })
      .catch(err => {
        setIsLoadingSearch(false);
        alert(`Search Error: ${err}`);
      });
  };

  const loadMoreChannelVideos = channel => {
    const channelId = channel?.id;

    getSearchResults({
      selectedSubscriptions: [channelId],
      subscriptions,
      apiKey: userData.apiKey,
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
    <div className={styles.home} data-theme={theme}>
      <AppHeader
        handleSubmitAuth={handleSubmitAuth}
        handleSubmitSearch={handleSubmitSearch}
        isUserAuthenticated={userData.isUserAuthenticated}
        isSearchEnabled={Boolean(selectedSubscriptions?.length)}
        isLoadingSearch={isLoadingSearch}
        className={styles.header}
      />

      <div className={styles.leftRail}>
        <SubscriptionSelector
          subscriptions={subscriptions}
          selectedSubscriptions={selectedSubscriptions}
          setSelectedSubscriptions={setSelectedSubscriptions}
          handleRefresh={() => {
            setSelectedSubscriptions([]);
            handleSubmitAuth({ apiKey: userData.apiKey, channelId: userData.channelId });
          }}
        />
      </div>

      <div className={styles.pageBody}>
        {userData?.isUserAuthenticated ? (
          searchResults?.map(channel => (
            <Gallery
              title={channel.title}
              image={channel.image}
              link={`https://www.youtube.com/${channel.link}`}
              items={channel.items}
              showLoadMore={Boolean(channel.pageToken)}
              loadMoreItems={() => {
                loadMoreChannelVideos(channel);
              }}
              handleRemove={() => {
                handleRemoveChannel(channel?.id);
              }}
              key={channel.id}
            />
          ))
        ) : (
          <LoginBanner className={styles.banner} />
        )}
      </div>
    </div>
  );
};

export default HomePage;
