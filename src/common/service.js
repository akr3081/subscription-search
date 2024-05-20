import { BASE_URL } from './constants';
import ChannelsMock from '../__mocks__/channels.json';
import SearchResultsMock from '../__mocks__/searchResults.json';
import SubscriptionMock from '../__mocks__/subscriptions.json';
import VideoMetadataMock from '../__mocks__/videoMetadata.json';

/**
 * Gets channel data for the associated subscription response.
 * @param {object} subscriptionData - Response payload for subscription request
 * @param {string} apiKey - API Key for YouTube Data API v3
 * @param {string} token - Token of the current page of resposnes
 * @returns {object} Object containing list of channel data objects
 */
export const fetchChannelData = async ({ subscriptionData, apiKey, pageToken }) => {
  if (process.env.MOCK_API_CALLS === 'true') return pageToken === '' ? ChannelsMock : { items: [] };

  const channelIds = subscriptionData?.items?.map(item => item?.snippet?.resourceId?.channelId) ?? [];
  const channelIdsParam = channelIds.join(',');

  const res = await fetch(
    `${BASE_URL}/channels?key=${apiKey}&part=snippet&id=${channelIdsParam}&order=alphabetical&maxResults=50`
  );
  return await res.json();
};

/**
 * Gets a list of channel videos based on search term
 * @param {string} channelId - The channel for which videos are searched
 * @param {string} apiKey - API Key for YouTube Data API v3
 * @param {string} searchTerm - Input for search results
 * @returns {object} Object containing list of video objects
 */
export const fetchSearchResults = async ({ channelId, apiKey, searchTerm, pageToken = '' }) => {
  if (process.env.MOCK_API_CALLS === 'true')
    return { ...SearchResultsMock, items: SearchResultsMock.items.slice(0, 4) };

  const res = await fetch(
    `${BASE_URL}/search?key=${apiKey}&channelId=${channelId}&maxResults=4&q=${searchTerm}&part=snippet&safeSearch=none&type=video&pageToken=${pageToken}`
  );
  return await res.json();
};

/**
 * Gets subscriptions based on the current pageToken
 * @param {string} channelId - The channel for which subscriptions are fetched
 * @param {string} apiKey - API Key for YouTube Data API v3
 * @param {string} pageToken - Token for paginated results
 * @returns {object} Object containing list of subscription data objects
 */
export const fetchSubscriptionData = async ({ channelId, apiKey, pageToken }) => {
  if (process.env.MOCK_API_CALLS === 'true') return pageToken === '' ? SubscriptionMock : { items: [] };

  const res = await fetch(
    `${BASE_URL}/subscriptions?key=${apiKey}&part=snippet,subscriberSnippet&channelId=${channelId}&order=alphabetical&maxResults=50&pageToken=${pageToken}`
  );
  return await res.json();
};

/**
 * Gets video metadata for a list of video ids.
 * @param {array} videoIds - List of video id strings
 * @param {string} apiKey - API Key for YouTube Data API v3
 * @returns {object} Object containing list of video metadata objects
 */
export const fetchVideoMetadata = async ({ videoIds, apiKey }) => {
  if (process.env.MOCK_API_CALLS === 'true') return VideoMetadataMock;

  const res = await fetch(
    `${BASE_URL}/videos?key=${apiKey}&id=${videoIds}&maxResults=50&part=statistics,contentDetails,snippet&safeSearch=none&type=video`
  );
  return await res.json();
};
