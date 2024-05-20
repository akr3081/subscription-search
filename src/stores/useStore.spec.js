import { act, renderHook } from '@testing-library/react';
import { THEMES } from '../common/constants.js';
import useStore, { initialState } from './useStore.js';

describe('useStore', () => {
  beforeEach(() => {
    useStore.setState(initialState);
  });

  it('should handle get/set for searchResults', () => {
    const { result } = renderHook(() => ({ ...useStore(state => state) }));

    expect(result.current.searchResults).toEqual(initialState.searchResults);
    expect(result.current.setSearchResults).toBeDefined();

    act(() => result.current.setSearchResults([{ abc: 123 }]));
    expect(result.current.searchResults).toEqual([{ abc: 123 }]);
  });

  it('should handle get/set for searchTerm', () => {
    const { result } = renderHook(() => ({ ...useStore(state => state) }));

    expect(result.current.searchTerm).toEqual(initialState.searchTerm);
    expect(result.current.setSearchTerm).toBeDefined();

    act(() => result.current.setSearchTerm('new-search-term'));
    expect(result.current.searchTerm).toEqual('new-search-term');
  });

  it('should handle get/set for selectedSubscriptions', () => {
    const { result } = renderHook(() => ({ ...useStore(state => state) }));

    expect(result.current.selectedSubscriptions).toEqual(initialState.selectedSubscriptions);
    expect(result.current.setSelectedSubscriptions).toBeDefined();

    act(() => result.current.setSelectedSubscriptions(['mock-sub-id']));
    expect(result.current.selectedSubscriptions).toEqual(['mock-sub-id']);
  });

  it('should handle get/set for subscriptions', () => {
    const { result } = renderHook(() => ({ ...useStore(state => state) }));

    expect(result.current.subscriptions).toEqual(initialState.subscriptions);
    expect(result.current.setSubscriptions).toBeDefined();

    act(() => result.current.setSubscriptions([{ abc: 123 }]));
    expect(result.current.subscriptions).toEqual([{ abc: 123 }]);
  });

  it('should handle get/set for theme', () => {
    const { result } = renderHook(() => ({ ...useStore(state => state) }));

    expect(result.current.theme).toEqual(initialState.theme);
    expect(result.current.setTheme).toBeDefined();

    act(() => result.current.setTheme(THEMES.DARK));
    expect(result.current.theme).toEqual(THEMES.DARK);
  });

  it('should handle get/set for userData', () => {
    const { result } = renderHook(() => ({ ...useStore(state => state) }));

    expect(result.current.userData).toEqual(initialState.userData);
    expect(result.current.setUserData).toBeDefined();

    act(() => result.current.setUserData({ abc: 123 }));
    expect(result.current.userData).toEqual({ abc: 123 });
  });

  it('should clear state when reset is called', () => {
    const { result } = renderHook(() => ({ ...useStore(state => state) }));

    act(() => result.current.reset());

    expect(result.current.searchResults).toEqual(initialState.searchResults);
    expect(result.current.searchTerm).toEqual(initialState.searchTerm);
    expect(result.current.selectedSubscriptions).toEqual(initialState.selectedSubscriptions);
    expect(result.current.subscriptions).toEqual(initialState.subscriptions);
    expect(result.current.theme).toEqual(initialState.theme);
    expect(result.current.userData).toEqual(initialState.userData);
  });
});
