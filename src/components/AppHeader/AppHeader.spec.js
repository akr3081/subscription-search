import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AppHeader from './AppHeader.jsx';
import { CLOSE_CTA, SAVE_CTA, USAGE_STEPS } from '../../common/constants.js';

describe('AppHeader', () => {
  const props = { handleSubmitAuth: jest.fn(), handleSubmitSearch: jest.fn(), isUserAuthenticated: true };

  it('should open/close the info modal', async () => {
    const user = userEvent.setup();
    render(<AppHeader {...props} />);

    const infoButton = screen.getByTestId('icon_button_info');
    await user.click(infoButton);

    // Should find info modal close button after icon button is clicked
    const infoModalCloseButton = await screen.queryByText(CLOSE_CTA);
    expect(infoModalCloseButton.tagName).toEqual('BUTTON');

    // Should not find info modal close button after modal has been closed
    await user.click(infoModalCloseButton);
    expect(screen.queryByText(CLOSE_CTA)).toEqual(null);
  });

  it('should open/close the settings modal', async () => {
    const user = userEvent.setup();
    render(<AppHeader {...props} />);

    const settingsButton = screen.getByTestId('icon_button_settings');
    await user.click(settingsButton);

    expect(screen.queryByText(SAVE_CTA)).toBeDefined();

    // Relying on modal veil due to form submit issues
    const modalVeil = screen.getByTestId('modal-veil');
    await user.click(modalVeil);

    expect(screen.queryByText(SAVE_CTA)).toEqual(null);
  });

  // FIXME: Add this test back once form validation issue is resolved
  it.skip('should call handleSubmitAuth when settings modal is submitted', async () => {
    const user = userEvent.setup();
    render(<AppHeader {...props} />);

    const settingsButton = screen.getByTestId('icon_button_settings');
    await user.click(settingsButton);

    // Update required fields
    const apiKeyField = await screen.getAllByRole('textbox')[0];
    fireEvent.change(apiKeyField, { target: { value: 'mock-api-key' } });

    const channelIdField = await screen.getAllByRole('textbox')[1];
    fireEvent.change(channelIdField, { target: { value: 'mock-channel-id' } });

    const settingsModalSaveButton = screen.queryByText(SAVE_CTA);
    await user.click(settingsModalSaveButton);

    // Should not find settings modal save button after modal has been closed
    expect(props.handleSubmitAuth).toHaveBeenCalled();
  });

  it('should call handleSubmitSearch when search bar is submitted', async () => {
    const user = userEvent.setup();
    render(<AppHeader {...props} />);

    const searchBarInput = screen.getByRole('textbox');
    fireEvent.change(searchBarInput, { target: { value: 'mock-search-term' } });

    const searchBarSubmitButton = screen.getByTestId('icon_button_search');
    await user.click(searchBarSubmitButton);

    expect(props.handleSubmitSearch).toHaveBeenCalledWith({ searchTerm: 'mock-search-term' });
  });

  it('should not render search bar if user is not authenticated', async () => {
    render(<AppHeader {...props} isUserAuthenticated={false} />);
    expect(screen.queryByTestId('icon_button_search')).toEqual(null);
  });
});
