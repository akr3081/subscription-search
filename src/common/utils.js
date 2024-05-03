import { BASE_URL } from './constants';
import SearchResultsMock from '../__mocks__/searchResults.json';
import SubscriptionMock from '../__mocks__/subscriptions.json';

/**
 * Returns a formatted string of how long ago a given timestamp was
 * @param {string} timestamp - Datetime string of when the video was published
 */
const formatDateString = timestamp => {
  const date = new Date(timestamp);
  const secondsAgo = Math.floor(Date.now() - date) / 1000;

  const yearsAgo = Math.floor(secondsAgo / 31536000);
  if (yearsAgo > 1) return `${yearsAgo} years ago`;
  if (yearsAgo === 1) return `${yearsAgo} year ago`;

  const monthsAgo = Math.floor(secondsAgo / 2592000);
  if (monthsAgo > 1) return `${monthsAgo} months ago`;
  if (monthsAgo === 1) return `${monthsAgo} month ago`;

  const daysAgo = Math.floor(secondsAgo / 864000);
  if (daysAgo > 1) return `${daysAgo} days ago`;
  if (daysAgo === 1) return `${daysAgo} days ago`;

  const hoursAgo = Math.floor(secondsAgo / 3600);
  if (hoursAgo > 1) return `${hoursAgo} hours ago`;
  if (hoursAgo === 1) return `${hoursAgo} hour ago`;

  const minutesAgo = Math.floor(secondsAgo / 60);
  if (minutesAgo > 1) return `${minutesAgo} minutes ago`;
  if (minutesAgo === 1) return `${minutesAgo} minutes ago`;

  return 'just now';
};

/**
 * Gets subscriptions based on the current pageToken
 * @param {string} channelId - The channel for which subscriptions are fetched
 * @param {string} apiKey - The api key used to fetch data
 * @param {string} pageToken - Token for paginated results
 * @returns {object} Subscription payload
 */
export const fetchSubscriptionData = async ({ channelId, apiKey, pageToken }) => {
  if (process.env.MOCK_API_CALLS === 'true') return pageToken === '' ? SubscriptionMock : { items: [] };

  const res = await fetch(
    `${BASE_URL}/subscriptions?key=${apiKey}&part=snippet&channelId=${channelId}&order=alphabetical&maxResults=50&pageToken=${pageToken}`
  );
  return await res.json();
};

/**
 * Gets a list of subscriptions for a given channel
 * @param {string} channelId - The channel for which subscriptions are fetched
 * @param {string} apiKey - The api key used to fetch data
 * @returns {array} List of subscriptions
 */
export const getSubscriptions = async ({ channelId, apiKey }) => {
  const subscriptionsList = [];
  let pageToken = '';

  do {
    const res = await fetchSubscriptionData({ channelId, apiKey, pageToken });

    // Propagate API errors
    if (res.error) throw new Error(res.error.message);

    pageToken = res.nextPageToken;
    if (res?.items?.length) subscriptionsList.push(...res.items);
  } while (pageToken);

  return subscriptionsList;
};

export const fetchVideoMetadata = async ({ videoIds, apiKey }) => {
  const res = await fetch(
    `${BASE_URL}/videos?key=${apiKey}&id=${videoIds}&maxResults=50&part=statistics,contentDetails,snippet&safeSearch=none&type=video`
  );
  return await res.json();
};

export const getMappedVideoResults = async ({ items, apiKey }) => {
  if (!items?.length) return [];

  const videoIds = items.map(item => item.id.videoId).join(',');
  const videosWithMetadata = await fetchVideoMetadata({ videoIds, apiKey });

  const mappedItems = videosWithMetadata.items.map(video => {
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
 * Gets a list of channel videos based on search term
 * @param {string} channelId - The channel for which videos are searched
 * @param {string} apiKey - The api key used to fetch data
 * @param {string} searchTerm - Input for search results
 * @returns {object} List of videos
 */
export const fetchChannelResults = async ({ channelId, apiKey, searchTerm, pageToken = '' }) => {
  if (process.env.MOCK_API_CALLS === 'true')
    return { ...SearchResultsMock, items: SearchResultsMock.items.slice(0, 4) };

  const res = await fetch(
    `${BASE_URL}/search?key=${apiKey}&channelId=${channelId}&maxResults=4&q=${searchTerm}&part=snippet&safeSearch=none&type=video&pageToken=${pageToken}`
  );
  return await res.json();
};

/**
 * Gets search results for provided subscriptions
 * @param {string} subscriptionIds - List of channel ids from your subscriptions
 * @param {string} apiKey - The api key used to fetch data
 * @param {string} searchTerm - Input for search results
 * @returns {array} List of channels with associated videos
 */
export const getSearchResults = async ({ selectedSubscriptions, subscriptions, apiKey, searchTerm, pageToken }) => {
  const channelResults = [];

  for (const subId of selectedSubscriptions) {
    const res = await fetchChannelResults({
      channelId: subId,
      apiKey,
      searchTerm,
      pageToken
    });

    // Propagate API errors
    if (res.error) throw new Error(res.error.message);

    const nextPageToken = res?.nextPageToken;
    const items = await getMappedVideoResults({ items: res?.items, apiKey });

    const channelData = subscriptions.find(sub => sub.snippet.resourceId.channelId === subId);
    const title = items?.[0]?.channelTitle ?? channelData.snippet.title;
    const image = channelData.snippet.thumbnails.medium;

    channelResults.push({ id: subId, title, image, pageToken: nextPageToken, items });
  }

  return channelResults;
};
