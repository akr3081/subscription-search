import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { THEMES } from '../../common/constants.js';
import useStore from '../../stores/useStore.js';
import ThemeToggle from './ThemeToggle.jsx';

describe('ThemeToggle', () => {
  it('should toggle theme state when component is clicked', async () => {
    const user = userEvent.setup();
    const { container } = render(<ThemeToggle />);

    const toggle = container.firstChild;
    expect(useStore.getState().theme).toEqual(THEMES.LIGHT);

    await user.click(toggle);
    expect(useStore.getState().theme).toEqual(THEMES.DARK);

    await user.click(toggle);
    expect(useStore.getState().theme).toEqual(THEMES.LIGHT);
  });

  it('should toggle theme state on keyDown event with enter/space', () => {
    const { container } = render(<ThemeToggle />);

    const toggle = container.firstChild;
    expect(useStore.getState().theme).toEqual(THEMES.LIGHT);

    // Should toggle with enter key code
    fireEvent.keyDown(toggle, { code: 'Enter' });
    expect(useStore.getState().theme).toEqual(THEMES.DARK);

    // Should not toggle with other key code
    fireEvent.keyDown(toggle, { code: 'Tab' });
    expect(useStore.getState().theme).toEqual(THEMES.DARK);

    // Should toggle with space key code
    fireEvent.keyDown(toggle, { code: 'Space' });
    expect(useStore.getState().theme).toEqual(THEMES.LIGHT);
  });
});
