import { fetchChannelData, fetchSearchResults, fetchSubscriptionData, fetchVideoMetadata } from './service.js';

/**
 * Returns a formatted string of how long ago a given timestamp was
 * @param {string} timestamp - Datetime string of when the video was published
 */
export const formatDateString = timestamp => {
  const date = new Date(timestamp);
  const secondsAgo = Math.floor(Date.now() - date) / 1000;

  const yearsAgo = Math.floor(secondsAgo / 31536000);
  if (yearsAgo > 1) return `${yearsAgo} years ago`;
  if (yearsAgo === 1) return `${yearsAgo} year ago`;

  const monthsAgo = Math.floor(secondsAgo / 2592000);
  if (monthsAgo > 1) return `${monthsAgo} months ago`;
  if (monthsAgo === 1) return `${monthsAgo} month ago`;

  const daysAgo = Math.floor(secondsAgo / 86400);
  if (daysAgo > 1) return `${daysAgo} days ago`;
  if (daysAgo === 1) return `${daysAgo} day ago`;

  const hoursAgo = Math.floor(secondsAgo / 3600);
  if (hoursAgo > 1) return `${hoursAgo} hours ago`;
  if (hoursAgo === 1) return `${hoursAgo} hour ago`;

  const minutesAgo = Math.floor(secondsAgo / 60);
  if (minutesAgo > 1) return `${minutesAgo} minutes ago`;
  if (minutesAgo === 1) return `${minutesAgo} minute ago`;

  return 'just now';
};

/**
 * Maps search results with video metadata
 * @param {array} items - List of search iterms
 * @param {string} apiKey - API Key for YouTube Data API v3
 * @returns {array} List of video results with metadata
 */
export const getMappedVideoResults = async ({ items, apiKey }) => {
  if (!items?.length) return [];

  const videoIds = items.map(item => item.id.videoId).join(',');
  const videosWithMetadata = await fetchVideoMetadata({ videoIds, apiKey });
  if (videosWithMetadata.error) throw new Error(videosWithMetadata.error.message);

  const mappedItems = videosWithMetadata?.items?.map(video => {
    // FIXME: Handle formatting for missing digits
    const duration = video.contentDetails.duration
      .replace('PT', '')
      .replace('H', ':')
      .replace('M', ':')
      .replace('S', '');

    const viewCount = Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(video.statistics.viewCount);

    const videoAge = formatDateString(video.snippet.publishedAt);

    return {
      videoId: video.id,
      duration,
      views: `${viewCount} views`,
      videoAge,
      ...video.snippet
    };
  });
  return mappedItems ?? [];
};

/**
 * Gets search results for provided subscriptions
 * @param {string} subscriptionIds - List of channel ids from your subscriptions
 * @param {string} apiKey - API Key for YouTube Data API v3
 * @param {string} searchTerm - Input for search results
 * @returns {array} List of channels with associated videos
 */
export const getSearchResults = async ({ selectedSubscriptions, subscriptions, apiKey, searchTerm, pageToken }) => {
  const channelResults = [];

  for (const subId of selectedSubscriptions) {
    const res = await fetchSearchResults({
      channelId: subId,
      apiKey,
      searchTerm,
      pageToken
    });

    // Propagate API errors
    if (res.error) throw new Error(res.error.message);

    const nextPageToken = res?.nextPageToken;
    const items = await getMappedVideoResults({ items: res?.items, apiKey });

    const channelData = subscriptions.find(sub => sub.id === subId);
    const title = channelData.snippet.title;
    const image = channelData.snippet.thumbnails.medium;
    const link = channelData.snippet.customUrl;

    channelResults.push({ id: subId, title, image, link, pageToken: nextPageToken, items });
  }

  return channelResults;
};

/**
 * Gets a list of subscriptions for a given channel
 * @param {string} channelId - The channel for which subscriptions are fetched
 * @param {string} apiKey - API Key for YouTube Data API v3
 * @returns {array} List of subscriptions
 */
export const getSubscriptions = async ({ channelId, apiKey }) => {
  const subscriptions = [];
  let pageToken = '';
  let userData = {};

  do {
    const subscriptionData = await fetchSubscriptionData({ channelId, apiKey, pageToken });
    if (subscriptionData.error) throw new Error(`fetchSubscriptionData error: ${subscriptionData.error.message}`);
    if (!userData.channelId) userData = subscriptionData?.items?.[0]?.subscriberSnippet;

    // Get associated channel data for each subscription
    const channelData = await fetchChannelData({ subscriptionData, apiKey, pageToken });
    if (channelData.error) throw new Error(`fetchChannelData error: ${channelData.error.message}`);

    pageToken = subscriptionData.nextPageToken;
    if (channelData?.items?.length) subscriptions.push(...channelData.items);
  } while (pageToken);

  if (!userData.channelId) throw new Error(`user auth error: ChannelId not found`);

  return { subscriptions, userData: { ...userData, apiKey } };
};
