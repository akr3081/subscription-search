import { BASE_URL } from './constants';
import SubscriptionMock from '../__mocks__/subscriptions.json';
import MappedSearchResultsMock from '../__mocks__/mappedSearchResults.json';

// FIXME: Remove this once testing is done
const MOCK_API_CALLS = true;

/**
 * Gets subscriptions based on the current pageToken
 * @param {string} channelId - The channel for which subscriptions are fetched
 * @param {string} apiKey - The api key used to fetch data
 * @param {string} pageToken - Token for paginated results
 * @returns {object} Subscription payload
 */
export const fetchSubscriptionData = async ({ channelId, apiKey, pageToken }) => {
  if (MOCK_API_CALLS) return pageToken === '' ? SubscriptionMock : { items: [] };

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
    pageToken = res.nextPageToken;
    subscriptionsList.push(...res.items);
  } while (pageToken);

  return subscriptionsList;
};

/**
 * Gets a list of channel videos based on search term
 * @param {string} channelId - The channel for which videos are searched
 * @param {string} apiKey - The api key used to fetch data
 * @param {string} searchTerm - Input for search results
 * @param {number} maxResultsPerChannel - The max number of results to return for each channel
 * @returns {object} List of videos
 */
export const fetchChannelResults = async ({ channelId, apiKey, searchTerm, maxResultsPerChannel }) => {
  const res = await fetch(
    `${BASE_URL}/search?key=${apiKey}&channelId=${channelId}&maxResults=${maxResultsPerChannel}&q=${searchTerm}&part=snippet&safeSearch=none&type=video`
  );
  const resJson = await res.json();
  return resJson.items;
};

/**
 * Gets search results for provided subscriptions
 * @param {string} subscriptionIds - List of channel ids from your subscriptions
 * @param {string} apiKey - The api key used to fetch data
 * @param {string} searchTerm - Input for search results
 * @param {number} maxResultsPerChannel - The max number of results to return for each channel
 * @returns {array} List of channels with associated videos
 */
export const getSearchResults = async ({
  selectedSubscriptions,
  subscriptions,
  apiKey,
  searchTerm,
  maxResultsPerChannel
}) => {
  if (MOCK_API_CALLS) return MappedSearchResultsMock;

  const channelResults = [];

  for (const subId of selectedSubscriptions) {
    const channelVideos = await fetchChannelResults({ channelId: subId, apiKey, searchTerm, maxResultsPerChannel });
    const id = channelVideos[0].snippet.channelId;
    const items = channelVideos.map(video => ({ videoId: video.id.videoId, ...video.snippet }));

    const channelData = subscriptions.find(sub => sub.snippet.resourceId.channelId === id);
    const title = channelData.snippet.title;
    const image = channelData.snippet.thumbnails.medium;

    channelResults.push({ id, title, image, items });
  }

  return channelResults;
};
