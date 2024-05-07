import ChannelsMock from '../__mocks__/channels.json';
import SubscriptionsMock from '../__mocks__/subscriptions.json';
import { getSubscriptions, getSearchResults } from './utils.js';

describe('utils', () => {
  const MOCK_API_CALLS = process.env.MOCK_API_CALLS;
  afterAll(() => {
    process.env.MOCK_API_CALLS = MOCK_API_CALLS;
  });

  describe('getSubscriptions', () => {
    it('should get subscriptions', async () => {
      process.env.MOCK_API_CALLS = 'true';
      const subs = await getSubscriptions({ apiKey: 'mock-api-key', channelId: 'mock-channel-id' });
      expect(subs.length).toEqual(ChannelsMock.items.length);
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

  describe('getSearchResults', () => {
    it('should get search results', async () => {
      process.env.MOCK_API_CALLS = 'true';

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

    it('should handle if a search returns no videos', async () => {
      process.env.MOCK_API_CALLS = 'false';
      global.fetch = jest.fn().mockImplementationOnce(() =>
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve({ nextPageToken: '', items: null })
        })
      );

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
          selectedSubscriptions: [ChannelsMock.items[0].id],
          subscriptions: ChannelsMock.items,
          apiKey: 'mock-api-key',
          searchTerm: 'mock-search-term'
        });
      }).rejects.toThrow();
    });
  });
});
