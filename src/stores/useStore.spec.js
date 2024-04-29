import { act, renderHook } from '@testing-library/react';
import useStore from './useStore.js';

describe('useStore', () => {
  const initialState = {
    apiKey: 'mock-api-key',
    channelId: 'mock-channel-id',
    searchTerm: 'mock-search-term',
    subscriptions: []
  };

  beforeEach(() => {
    useStore.setState(initialState);
  });

  it('should handle get/set for apiKey', () => {
    const { result } = renderHook(() => ({ ...useStore(state => state) }));

    expect(result.current.apiKey).toEqual(initialState.apiKey);
    expect(result.current.setApiKey).toBeDefined();

    act(() => result.current.setApiKey('new-api-key'));
    expect(result.current.apiKey).toEqual('new-api-key');
  });

  it('should handle get/set for channelId', () => {
    const { result } = renderHook(() => ({ ...useStore(state => state) }));

    expect(result.current.channelId).toEqual(initialState.channelId);
    expect(result.current.setApiKey).toBeDefined();

    act(() => result.current.setChannelId('new-channel-id'));
    expect(result.current.channelId).toEqual('new-channel-id');
  });

  it('should handle get/set for searchTerm', () => {
    const { result } = renderHook(() => ({ ...useStore(state => state) }));

    expect(result.current.searchTerm).toEqual(initialState.searchTerm);
    expect(result.current.setSearchTerm).toBeDefined();

    act(() => result.current.setSearchTerm('new-search-term'));
    expect(result.current.searchTerm).toEqual('new-search-term');
  });

  it('should handle get/set for subscriptions', () => {
    const { result } = renderHook(() => ({ ...useStore(state => state) }));

    expect(result.current.subscriptions).toEqual(initialState.subscriptions);
    expect(result.current.setSubscriptions).toBeDefined();

    act(() => result.current.setSubscriptions([{ abc: 123 }]));
    expect(result.current.subscriptions).toEqual([{ abc: 123 }]);
  });

  it('should clear state when reset is called', () => {
    const { result } = renderHook(() => ({ ...useStore(state => state) }));

    expect(result.current.apiKey).toEqual(initialState.apiKey);
    expect(result.current.channelId).toEqual(initialState.channelId);
    expect(result.current.searchTerm).toEqual(initialState.searchTerm);
    expect(result.current.subscriptions).toEqual(initialState.subscriptions);

    act(() => result.current.reset());

    expect(result.current.apiKey).toEqual('');
    expect(result.current.channelId).toEqual('');
    expect(result.current.searchTerm).toEqual('');
    expect(result.current.subscriptions).toEqual([]);
  });
});
