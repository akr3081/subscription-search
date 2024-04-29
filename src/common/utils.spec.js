import SearchResultsMock from '../__mocks__/searchResults.json';
import SubscriptionsMock from '../__mocks__/subscriptions.json';
import { fetchSubscriptionData, getSubscriptions, fetchChannelResults, getSearchResults } from './utils.js';

describe('utils', () => {
  const MOCK_API_CALLS = process.env.MOCK_API_CALLS;
  afterAll(() => {
    process.env.MOCK_API_CALLS = MOCK_API_CALLS;
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

  describe('getSubscriptions', () => {
    it('should get subscriptions', () => {
      expect(getSubscriptions).toBeDefined();
    });
  });

  describe('fetchChannelResults', () => {
    it('should return mock data if MOCK_API_CALLS is enabled', async () => {
      process.env.MOCK_API_CALLS = 'true';
      const res = await fetchChannelResults({
        channelId: 'mockChannelId',
        apiKey: 'mockApiKey',
        searchTerm: 'mockSearchTerm',
        pageToken: ''
      });
      expect(res).toEqual({ ...SearchResultsMock, items: SearchResultsMock.items.slice(0, 3) });
    });

    it('should fetch subscription data', async () => {
      process.env.MOCK_API_CALLS = 'false';
      global.fetch = jest.fn().mockImplementationOnce(() =>
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve({ test: 123 })
        })
      );

      const res = await fetchChannelResults({
        channelId: 'mockChannelId',
        apiKey: 'mockApiKey',
        searchTerm: 'mockSearchTerm'
      });
      expect(res).toEqual({ test: 123 });
    });
  });

  describe('getSearchResults', () => {
    it('should get search results', () => {
      expect(getSearchResults).toBeDefined();
    });
  });
});
