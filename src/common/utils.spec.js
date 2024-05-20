import ChannelsMock from '../__mocks__/channels.json';
import SearchResultsMock from '../__mocks__/searchResults.json';
import SubscriptionMock from '../__mocks__/subscriptions.json';
import VideoMetadataMock from '../__mocks__/videoMetadata.json';
import { fetchChannelData, fetchSearchResults, fetchSubscriptionData, fetchVideoMetadata } from './service.js';
import { formatDateString, getSubscriptions, getSearchResults, getMappedVideoResults } from './utils.js';

jest.mock('./service.js', () => ({
  fetchChannelData: jest.fn(),
  fetchSearchResults: jest.fn(),
  fetchSubscriptionData: jest.fn(),
  fetchVideoMetadata: jest.fn()
}));

describe('utils', () => {
  describe('formatDateString', () => {
    it('should get formatted date string', () => {
      // Jest setup has date.now set to 2024-05-07T15:00:07Z
      expect(formatDateString('2024-05-07T14:58:07Z')).toEqual('2 minutes ago');
      expect(formatDateString('2024-05-07T14:59:07Z')).toEqual('1 minute ago');

      expect(formatDateString('2024-05-07T13:00:07Z')).toEqual('2 hours ago');
      expect(formatDateString('2024-05-07T14:00:07Z')).toEqual('1 hour ago');

      expect(formatDateString('2024-05-05T15:00:07Z')).toEqual('2 days ago');
      expect(formatDateString('2024-05-06T15:00:07Z')).toEqual('1 day ago');

      expect(formatDateString('2024-03-07T15:00:07Z')).toEqual('2 months ago');
      expect(formatDateString('2024-04-07T15:00:07Z')).toEqual('1 month ago');

      expect(formatDateString('2022-05-07T15:00:07Z')).toEqual('2 years ago');
      expect(formatDateString('2023-05-07T15:00:07Z')).toEqual('1 year ago');

      expect(formatDateString('2024-05-07T15:00:07Z')).toEqual('just now');
      expect(formatDateString('')).toEqual('just now');
    });
  });

  describe('getMappedVideoResults', () => {
    it('should get mapped video results', async () => {
      fetchVideoMetadata.mockReturnValue(VideoMetadataMock);

      const results = await getMappedVideoResults({
        items: [{ id: 'mock-video-id' }],
        apiKey: 'mock-api-key'
      });

      // Mapped fields from metadata
      expect(typeof results[0].videoId).toEqual('string');
      expect(typeof results[0].duration).toEqual('string');
      expect(typeof results[0].views).toEqual('string');
      expect(typeof results[0].videoAge).toEqual('string');

      // Snippet fields
      expect(typeof results[0].publishedAt).toEqual('string');
      expect(typeof results[0].channelId).toEqual('string');
      expect(typeof results[0].title).toEqual('string');
      expect(typeof results[0].description).toEqual('string');
      expect(typeof results[0].thumbnails).toEqual('object');
      expect(typeof results[0].channelTitle).toEqual('string');
      expect(typeof results[0].tags).toEqual('object');
      expect(typeof results[0].categoryId).toEqual('string');
      expect(typeof results[0].liveBroadcastContent).toEqual('string');
      expect(typeof results[0].localized).toEqual('object');
      expect(typeof results[0].defaultAudioLanguage).toEqual('string');
    });

    it('should return empty array without items', async () => {
      fetchVideoMetadata.mockReturnValue(VideoMetadataMock);

      const results = await getMappedVideoResults({
        items: null,
        apiKey: 'mock-api-key'
      });

      expect(results).toEqual([]);
    });

    it('should return empty array if no data is returned from fetchVideoMetadata', async () => {
      fetchVideoMetadata.mockReturnValue({});

      const results = await getMappedVideoResults({
        items: [{ id: 'mock-video-id' }],
        apiKey: 'mock-api-key'
      });

      expect(results).toEqual([]);
    });

    it('should throw if there is an error in the fetch response', async () => {
      fetchVideoMetadata.mockReturnValue({ error: 'mock-error' });

      expect(async () => {
        await getMappedVideoResults({
          items: [{ id: 'mock-video-id' }],
          apiKey: 'mock-api-key'
        });
      }).rejects.toThrow();
    });
  });

  describe('getSearchResults', () => {
    it('should get search results', async () => {
      fetchSearchResults.mockReturnValue(SearchResultsMock);
      fetchVideoMetadata.mockReturnValue(VideoMetadataMock);

      const results = await getSearchResults({
        selectedSubscriptions: [ChannelsMock.items[0].id],
        subscriptions: ChannelsMock.items,
        apiKey: 'mock-api-key',
        searchTerm: 'mock-search-term'
      });

      expect(typeof results[0].id).toEqual('string');
      expect(typeof results[0].title).toEqual('string');
      expect(typeof results[0].image).toEqual('object');
      expect(typeof results[0].pageToken).toEqual('string');
      expect(typeof results[0].items[0]).toEqual('object');
    });

    it('should throw if there is an error in the fetch response', async () => {
      fetchSearchResults.mockReturnValue({ error: 'mock-error' });

      expect(async () => {
        await getSearchResults({
          selectedSubscriptions: [ChannelsMock.items[0].id],
          subscriptions: ChannelsMock.items,
          apiKey: 'mock-api-key',
          searchTerm: 'mock-search-term'
        });
      }).rejects.toThrow();
    });
  });

  describe('getSubscriptions', () => {
    it('should get subscriptions/userData', async () => {
      fetchSubscriptionData.mockReturnValue(SubscriptionMock);
      fetchChannelData.mockReturnValue(ChannelsMock);
      const { subscriptions, userData } = await getSubscriptions({
        apiKey: 'mock-api-key',
        channelId: 'mock-channel-id'
      });
      expect(subscriptions.length).toEqual(ChannelsMock.items.length);
      expect(userData.channelId).toEqual(SubscriptionMock.items[0].subscriberSnippet.channelId);
    });

    it('should return empty array if fetchChannelData returns empty result', async () => {
      fetchSubscriptionData.mockReturnValue(SubscriptionMock);
      fetchChannelData.mockReturnValue({});
      const { subscriptions } = await getSubscriptions({
        apiKey: 'mock-api-key',
        channelId: 'mock-channel-id'
      });
      expect(subscriptions).toEqual([]);
    });

    it('should throw if there is an error in the fetchSubscriptionData response', async () => {
      fetchSubscriptionData.mockReturnValue({ error: 'mock-error' });

      expect(async () => {
        await getSubscriptions({ apiKey: 'mock-api-key', channelId: 'mock-channel-id' });
      }).rejects.toThrow();
    });

    it('should throw if there is an error in the fetchChannelData response', async () => {
      fetchSubscriptionData.mockReturnValue(SubscriptionMock);
      fetchChannelData.mockReturnValue({ error: 'mock-error' });

      expect(async () => {
        await getSubscriptions({ apiKey: 'mock-api-key', channelId: 'mock-channel-id' });
      }).rejects.toThrow();
    });
  });
});
