import React from 'react';
import { render, screen } from '@testing-library/react';
import useStore from '../stores/useStore.js';
import HomePage from './home.jsx';

describe('Home Page', () => {
  it('should render home page with default state', () => {
    render(<HomePage />);

    // Renders header
    expect(screen.getByTestId('icon_button_info')).toBeDefined();
    expect(screen.getByTestId('icon_button_settings')).toBeDefined();

    // Subscription selector not rendered when user is not authenticated
    expect(screen.queryByTestId('icon_button_sync')).toBeNull();
  });

  it('should render subscription selector when authenticated', () => {
    useStore.setState({ apiKey: 'mock-api-key', channelId: 'mock-channel-id' });
    render(<HomePage />);

    expect(screen.getByTestId('icon_button_sync')).toBeDefined();
  });
});
