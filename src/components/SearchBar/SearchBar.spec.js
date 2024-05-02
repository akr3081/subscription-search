import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from './SearchBar.jsx';

describe('SearchBar', () => {
  it('should call handleSubmit when search button is clicked', async () => {
    const user = userEvent.setup();
    const props = {
      handleSubmit: jest.fn(),
      isSearchEnabled: true
    };

    render(<SearchBar {...props} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'mock-search-term' } });

    const submitButton = screen.getByTestId('icon_button_search');
    await user.click(submitButton);

    expect(props.handleSubmit).toHaveBeenCalled();
  });

  it('should not call handleSubmit if isSearchEnabled is false', async () => {
    const user = userEvent.setup();
    const props = {
      handleSubmit: jest.fn(),
      isSearchEnabled: false
    };

    render(<SearchBar {...props} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'mock-search-term' } });

    const submitButton = screen.getByTestId('icon_button_search');
    await user.click(submitButton);

    expect(props.handleSubmit).not.toHaveBeenCalled();
  });
});
