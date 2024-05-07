import ChannelsMock from '../__mocks__/channels.json';
import SearchResultsMock from '../__mocks__/searchResults.json';
import SubscriptionsMock from '../__mocks__/subscriptions.json';
import VideoMetadataMock from '../__mocks__/videoMetadata.json';
import { fetchChannelData, fetchSearchResults, fetchSubscriptionData, fetchVideoMetadata } from './service.js';

describe('services', () => {
  const MOCK_API_CALLS = process.env.MOCK_API_CALLS;
  afterAll(() => {
    process.env.MOCK_API_CALLS = MOCK_API_CALLS;
  });

  describe('fetchChannelData', () => {
    it('should return mock data if MOCK_API_CALLS is enabled', async () => {
      process.env.MOCK_API_CALLS = 'true';
      const res = await fetchChannelData({
        subscriptionData: SubscriptionsMock,
        apiKey: 'mockApiKey',
        pageToken: ''
      });
      expect(res).toEqual(ChannelsMock);
    });

    it('should return empty items array if MOCK_API_CALLS is enabled and pageToken is present', async () => {
      process.env.MOCK_API_CALLS = 'true';
      const res = await fetchChannelData({
        subscriptionData: SubscriptionsMock,
        apiKey: 'mockApiKey',
        pageToken: 'mockToken'
      });
      expect(res).toEqual({ items: [] });
    });

    it('should fetch channel data', async () => {
      process.env.MOCK_API_CALLS = 'false';
      global.fetch = jest.fn().mockImplementationOnce(() =>
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve({ test: 123 })
        })
      );

      const res = await fetchChannelData({
        subscriptionData: SubscriptionsMock,
        apiKey: 'mockApiKey',
        pageToken: ''
      });
      expect(res).toEqual({ test: 123 });
    });

    it('should handle missing subscriptionData', async () => {
      process.env.MOCK_API_CALLS = 'false';
      global.fetch = jest.fn().mockImplementationOnce(() =>
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve({ test: 123 })
        })
      );

      const res = await fetchChannelData({
        subscriptionData: null,
        apiKey: 'mockApiKey',
        pageToken: ''
      });
      expect(res).toEqual({ test: 123 });
    });
  });

  describe('fetchSearchResults', () => {
    it('should return mock data if MOCK_API_CALLS is enabled', async () => {
      process.env.MOCK_API_CALLS = 'true';
      const res = await fetchSearchResults({
        channelId: 'mockChannelId',
        apiKey: 'mockApiKey',
        searchTerm: 'mockSearchTerm',
        pageToken: ''
      });
      expect(res).toEqual({ ...SearchResultsMock, items: SearchResultsMock.items.slice(0, 4) });
    });

    it('should fetch subscription data', async () => {
      process.env.MOCK_API_CALLS = 'false';
      global.fetch = jest.fn().mockImplementationOnce(() =>
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve({ test: 123 })
        })
      );

      const res = await fetchSearchResults({
        channelId: 'mockChannelId',
        apiKey: 'mockApiKey',
        searchTerm: 'mockSearchTerm'
      });
      expect(res).toEqual({ test: 123 });
    });
  });

  describe('fetchSubscriptionData', () => {
    it('should return mock data if MOCK_API_CALLS is enabled', async () => {
      process.env.MOCK_API_CALLS = 'true';
      const res = await fetchSubscriptionData({
        channelId: 'mockChannelId',
        apiKey: 'mockApiKey',
        pageToken: ''
      });
      expect(res).toEqual(SubscriptionsMock);
    });

    it('should return empty items array if MOCK_API_CALLS is enabled and pageToken is present', async () => {
      process.env.MOCK_API_CALLS = 'true';
      const res = await fetchSubscriptionData({
        channelId: 'mockChannelId',
        apiKey: 'mockApiKey',
        pageToken: 'mockToken'
      });
      expect(res).toEqual({ items: [] });
    });

    it('should fetch subscription data', async () => {
      process.env.MOCK_API_CALLS = 'false';
      global.fetch = jest.fn().mockImplementationOnce(() =>
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve({ test: 123 })
        })
      );

      const res = await fetchSubscriptionData({
        channelId: 'mockChannelId',
        apiKey: 'mockApiKey'
      });
      expect(res).toEqual({ test: 123 });
    });
  });

  describe('fetchVideoMetadata', () => {
    it('should return mock data if MOCK_API_CALLS is enabled', async () => {
      process.env.MOCK_API_CALLS = 'true';
      const res = await fetchVideoMetadata({
        videoIds: ['video-id-123'],
        apiKey: 'mockApiKey'
      });
      expect(res).toEqual(VideoMetadataMock);
    });

    it('should fetch subscription data', async () => {
      process.env.MOCK_API_CALLS = 'false';
      global.fetch = jest.fn().mockImplementationOnce(() =>
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve({ test: 123 })
        })
      );

      const res = await fetchVideoMetadata({
        videoIds: ['video-id-123'],
        apiKey: 'mockApiKey'
      });
      expect(res).toEqual({ test: 123 });
    });
  });
});
