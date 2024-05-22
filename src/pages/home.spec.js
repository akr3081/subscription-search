import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MappedSearchResultsMock from '../__mocks__/mappedSearchResults.json';
import SearchResultsMock from '../__mocks__/searchResults.json';
import ChannelsMock from '../__mocks__/channels.json';
import useStore from '../stores/useStore.js';
import HomePage from './home.jsx';
import { LOAD_MORE_CTA, MAX_RESULTS } from '../common/constants.js';
import { getSearchResults } from '../common/utils.js';
import { fetchSearchResults } from '../common/service.js';

jest.mock('../common/service.js', () => ({
  ...jest.requireActual('../common/service.js'),
  fetchSearchResults: jest.fn() // TODO: This
}));

describe('Home Page', () => {
  beforeEach(() => {
    fetchSearchResults.mockReturnValue({ ...SearchResultsMock, items: SearchResultsMock.items.slice(0, MAX_RESULTS) });
  });
  it('should render home page with default state', () => {
    render(<HomePage />);

    // Renders header
    expect(screen.getByTestId('menu_button')).toBeDefined();

    // Subscription selector not rendered when user is not authenticated
    expect(screen.queryByTestId('icon_button_sync')).toBeNull();
  });

  it('should render app header and handle search bar submit', async () => {
    const user = userEvent.setup();
    useStore.setState({
      searchResults: [],
      searchTerm: '',
      selectedSubscriptions: [ChannelsMock.items[0].id],
      subscriptions: ChannelsMock.items,
      userData: { apiKey: 'mock-api-key', channelId: 'mock-channel-id', isUserAuthenticated: true }
    });
    render(<HomePage />);

    expect(useStore.getState().searchTerm).toEqual('');
    expect(useStore.getState().searchResults.length).toEqual(0);

    const searchBarInput = screen.getByPlaceholderText('Search');
    const searchBarSubmitButton = screen.getByTestId('icon_button_search');

    fireEvent.change(searchBarInput, { target: { value: 'mock-search-term' } });
    await user.click(searchBarSubmitButton);

    expect(useStore.getState().searchTerm).toEqual('mock-search-term');
    expect(useStore.getState().searchResults.length > 0).toEqual(true);
  });

  it('should render subscription selector based on subscriptions/selectedSubscriptions state', async () => {
    const user = userEvent.setup();
    useStore.setState({
      subscriptions: ChannelsMock.items,
      selectedSubscriptions: [ChannelsMock.items[0].id],
      userData: { apiKey: 'mock-api-key', channelId: 'mock-channel-id', isUserAuthenticated: true }
    });
    render(<HomePage />);

    // Selected subscriptions
    expect(screen.getAllByTestId('icon_button_subtract').length).toEqual(1);

    // Unselected subscriptions
    expect(screen.getAllByTestId('icon_button_add').length).toEqual(ChannelsMock.items.length - 1);

    // Should clear selected subcriptions when sync button is clicked
    const syncButton = screen.getByTestId('icon_button_sync');
    await user.click(syncButton);
    expect(screen.queryAllByTestId('icon_button_subtract').length).toEqual(0);
  });

  it('should render channel gallery components based on searchResults state', async () => {
    const user = userEvent.setup();
    useStore.setState({ searchResults: MappedSearchResultsMock });
    render(<HomePage />);

    const videoTitle = MappedSearchResultsMock[0].items[0].title;

    // Video is not found until arrow button is clicked and gallery is opened
    expect(screen.queryByText(videoTitle)).toBeNull();

    // Video is now found
    const galleryArrowIconButton = screen.getAllByTestId('icon_button_arrow')[0];
    await user.click(galleryArrowIconButton);
    expect(screen.queryByText(videoTitle)).not.toBeNull();

    // Video no longer found after gallery is removed
    const galleryRemoveIconButton = screen.getAllByTestId('icon_button_remove')[0];
    await user.click(galleryRemoveIconButton);
    expect(screen.queryByText(videoTitle)).toBeNull();
  });

  it('should load more videos when load more button is clicked', async () => {
    const user = userEvent.setup();

    const results = await getSearchResults({
      selectedSubscriptions: [ChannelsMock.items[0].id],
      subscriptions: ChannelsMock.items,
      apiKey: 'mock-api-key',
      searchTerm: 'mock-search-term'
    });

    useStore.setState({ searchResults: results });
    render(<HomePage />);

    const channelTitle = ChannelsMock.items[0].snippet.title;

    // Video is now found
    const galleryArrowIconButton = screen.getAllByTestId('icon_button_arrow')[0];
    await user.click(galleryArrowIconButton);

    // Channel result with default video count
    expect(screen.getByText(`${channelTitle} (${MAX_RESULTS})`)).toBeDefined();

    const galleryLoadMoreButton = screen.getAllByText(LOAD_MORE_CTA)[0];
    await user.click(galleryLoadMoreButton);

    await waitFor(() => {
      // Channel result with updated video count
      expect(screen.getByText(`${channelTitle} (${MAX_RESULTS * 2})`)).toBeDefined();
    });
  });

  it('should catch and show alert message for search error', async () => {
    fetchSearchResults.mockReturnValue({ error: 'mock-error' });

    const user = userEvent.setup();
    useStore.setState({
      searchResults: [],
      searchTerm: '',
      selectedSubscriptions: [ChannelsMock.items[0].id],
      subscriptions: ChannelsMock.items,
      userData: { apiKey: 'mock-api-key', channelId: 'mock-channel-id', isUserAuthenticated: true }
    });
    render(<HomePage />);

    expect(useStore.getState().searchTerm).toEqual('');
    expect(useStore.getState().searchResults.length).toEqual(0);

    const searchBarInput = screen.getByPlaceholderText('Search');
    const searchBarSubmitButton = screen.getByTestId('icon_button_search');

    fireEvent.change(searchBarInput, { target: { value: 'mock-search-term' } });
    await user.click(searchBarSubmitButton);

    expect(useStore.getState().searchTerm).toEqual('');
    expect(useStore.getState().searchResults.length === 0).toEqual(true);
  });
});
