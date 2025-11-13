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

  useEffect(() => {
    // Updated search results with empty results objects for new selectedSubscriptions
    const selectedSubResults = selectedSubscriptions.map(selectedSubId => {
      const existingResult = searchResults?.find(channelRes => channelRes.id === selectedSubId);
      if (existingResult) return existingResult;

      const matchedSubscription = subscriptions.find(sub => sub.id === selectedSubId);

      return {
        id: selectedSubId,
        title: matchedSubscription.snippet.title,
        image: matchedSubscription.snippet.thumbnails.medium,
        link: matchedSubscription.snippet.customUrl,
        items: []
      };
    });

    // Filter to remove any results which are not found in selectedSubscriptions
    const newResults = selectedSubResults?.filter(channelRes => selectedSubscriptions.includes(channelRes.id));
    setSearchResults(newResults);
  }, [selectedSubscriptions]);

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
        if (results.length) {
          setHistory([
            { timestamp: new Date().getTime(), searchTerm: formData.searchTerm, selectedSubscriptions: selectedSubs },
            ...history
          ]);
        }
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
    const newSelectedSubscriptions = selectedSubscriptions.filter(sub => sub !== channelId);
    setSelectedSubscriptions(newSelectedSubscriptions);
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
          searchResults
            ?.sort((a, b) => a.title.localeCompare(b.title))
            ?.filter(result => result.items.length)
            ?.concat(searchResults.filter(result => !result.items.length))
            ?.map(channel => (
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
                key={`gallery_${channel.id}`}
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
