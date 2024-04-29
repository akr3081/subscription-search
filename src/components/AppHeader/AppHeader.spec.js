import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CLOSE_CTA, SAVE_CTA } from '../../common/constants.js';
import AppHeader from './AppHeader.jsx';

describe('AppHeader', () => {
  const props = { handleSubmitSearch: jest.fn(), isUserAuthenticated: true };

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

  it('should call handleSubmitAuth when settings modal is submitted', async () => {
    const user = userEvent.setup();
    const handleSubmitAuthMock = jest.fn(() => true);
    render(<AppHeader {...props} handleSubmitAuth={handleSubmitAuthMock} />);

    const settingsButton = screen.getByTestId('icon_button_settings');
    await user.click(settingsButton);

    const authForm = screen.getByTestId('auth_form');
    fireEvent.submit(authForm);

    // Should call handleSubmitAuth and not find save cta as modal is closed
    await waitFor(() => {
      expect(handleSubmitAuthMock).toHaveBeenCalled();
      expect(screen.queryByText(SAVE_CTA)).toBeNull();
    });
  });

  it('should not close auth modal if handleSubmitAuth returns false', async () => {
    const user = userEvent.setup();
    const handleSubmitAuthMock = jest.fn(() => false);
    render(<AppHeader {...props} handleSubmitAuth={handleSubmitAuthMock} />);

    const settingsButton = screen.getByTestId('icon_button_settings');
    await user.click(settingsButton);

    const authForm = screen.getByTestId('auth_form');
    fireEvent.submit(authForm);

    // Should call handleSubmitAuth and still find save cta if it returns false
    expect(handleSubmitAuthMock).toHaveBeenCalled();
    expect(screen.getByText(SAVE_CTA)).toBeDefined();
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
