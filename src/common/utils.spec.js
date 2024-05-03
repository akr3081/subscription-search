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
    it('should get subscriptions', async () => {
      process.env.MOCK_API_CALLS = 'true';
      const subs = await getSubscriptions({ apiKey: 'mock-api-key', channelId: 'mock-channel-id' });
      expect(subs).toEqual(SubscriptionsMock.items);
    });

    it('should throw if there is an error in the fetch response', async () => {
      process.env.MOCK_API_CALLS = 'false';
      global.fetch = jest.fn().mockImplementationOnce(() =>
        Promise.resolve({
          status: 500,
          json: () => Promise.resolve({ error: 'mock error description' })
        })
      );

      expect(async () => {
        await getSubscriptions({ apiKey: 'mock-api-key', channelId: 'mock-channel-id' });
      }).rejects.toThrow();
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

      const res = await fetchChannelResults({
        channelId: 'mockChannelId',
        apiKey: 'mockApiKey',
        searchTerm: 'mockSearchTerm'
      });
      expect(res).toEqual({ test: 123 });
    });
  });

  describe('getSearchResults', () => {
    it('should get search results', async () => {
      process.env.MOCK_API_CALLS = 'true';

      const results = await getSearchResults({
        selectedSubscriptions: [SubscriptionsMock.items[0].snippet.resourceId.channelId],
        subscriptions: SubscriptionsMock.items,
        apiKey: 'mock-api-key',
        searchTerm: 'mock-search-term'
      });
      expect(typeof results[0].id).toEqual('string');
      expect(typeof results[0].title).toEqual('string');
      expect(typeof results[0].image).toEqual('object');
      expect(typeof results[0].pageToken).toEqual('string');
      expect(typeof results[0].items[0]).toEqual('object');
    });

    it('should handle if a search returns no videos', async () => {
      process.env.MOCK_API_CALLS = 'false';
      global.fetch = jest.fn().mockImplementationOnce(() =>
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve({ nextPageToken: '', items: null })
        })
      );

      const results = await getSearchResults({
        selectedSubscriptions: [SubscriptionsMock.items[0].snippet.resourceId.channelId],
        subscriptions: SubscriptionsMock.items,
        apiKey: 'mock-api-key',
        searchTerm: 'mock-search-term'
      });

      expect(typeof results[0].id).toEqual('string');
      expect(typeof results[0].title).toEqual('string');
      expect(typeof results[0].image).toEqual('object');
      expect(typeof results[0].pageToken).toEqual('string');
      expect(results[0].items).toEqual([]);
    });

    it('should throw if there is an error in the fetch response', async () => {
      process.env.MOCK_API_CALLS = 'false';
      global.fetch = jest.fn().mockImplementationOnce(() =>
        Promise.resolve({
          status: 500,
          json: () => Promise.resolve({ error: 'mock error description' })
        })
      );

      expect(async () => {
        await getSearchResults({
          selectedSubscriptions: [SubscriptionsMock.items[0].snippet.resourceId.channelId],
          subscriptions: SubscriptionsMock.items,
          apiKey: 'mock-api-key',
          searchTerm: 'mock-search-term'
        });
      }).rejects.toThrow();
    });
  });
});
