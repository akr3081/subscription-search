import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CLEAR_DATA_CTA, SAVE_CTA } from '../../common/constants.js';
import AuthModal from './AuthModal.jsx';

describe('AuthModal', () => {
  let originalWindow = window;

  beforeEach(() => {
    delete window.location;
    window.location = { reload: jest.fn() };
  });

  afterEach(() => {
    window = originalWindow;
  });

  const props = {
    isOpen: true,
    handleClose: jest.fn(),
    handleSubmit: jest.fn(e => e.preventDefault()),
    isUserAuthenticated: false
  };

  it('should call handleSubmit when save button is clicked', async () => {
    const user = userEvent.setup();
    render(<AuthModal {...props} />);

    // Update required fields
    const apiKeyField = await screen.getAllByRole('textbox')[0];
    fireEvent.change(apiKeyField, { target: { value: 'mock-api-key' } });

    const channelIdField = await screen.getAllByRole('textbox')[1];
    fireEvent.change(channelIdField, { target: { value: 'mock-channel-id' } });

    const saveButton = screen.queryByText(SAVE_CTA);
    await user.click(saveButton);

    expect(props.handleSubmit).toHaveBeenCalled();
  });

  it('should clear state and refresh page when clear button is clicked', async () => {
    const user = userEvent.setup();
    render(<AuthModal {...props} isUserAuthenticated />);

    // This button only appears after a user is authenticated
    const clearButton = screen.queryByText(CLEAR_DATA_CTA);
    await user.click(clearButton);
    expect(window.location.reload).toHaveBeenCalled();
  });
});
