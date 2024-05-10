import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useStore from '../../stores/useStore.js';
import ThemeToggle from './ThemeToggle.jsx';

describe('ThemeToggle', () => {
  it('should toggle theme state when component is clicked', async () => {
    const user = userEvent.setup();
    const { container } = render(<ThemeToggle />);

    const toggle = container.firstChild;
    expect(useStore.getState().theme).toEqual('light');

    await user.click(toggle);
    expect(useStore.getState().theme).toEqual('dark');

    await user.click(toggle);
    expect(useStore.getState().theme).toEqual('light');
  });

  it('should toggle theme state on keyDown event with enter/space', () => {
    const { container } = render(<ThemeToggle />);

    const toggle = container.firstChild;
    expect(useStore.getState().theme).toEqual('light');

    // Should toggle with enter key code
    fireEvent.keyDown(toggle, { code: 'Enter' });
    expect(useStore.getState().theme).toEqual('dark');

    // Should not toggle with other key code
    fireEvent.keyDown(toggle, { code: 'Tab' });
    expect(useStore.getState().theme).toEqual('dark');

    // Should toggle with space key code
    fireEvent.keyDown(toggle, { code: 'Space' });
    expect(useStore.getState().theme).toEqual('light');
  });
});
