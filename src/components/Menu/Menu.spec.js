import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useStore from '../../stores/useStore.js';
import Menu from './Menu.jsx';

describe('Menu', () => {
  beforeEach(() => {
    useStore.setState({ userData: { isUserAuthenticated: true } });
  });

  const props = {
    items: [
      {
        iconName: 'subtract',
        label: 'Example Item 1',
        isHidden: false,
        onClick: jest.fn()
      },
      {
        iconName: 'add',
        label: 'Example Item 2',
        isHidden: true,
        onClick: jest.fn()
      }
    ],
    showThemeToggle: true
  };
  it('should open the menu when menu button is clicked', async () => {
    const user = userEvent.setup();
    render(<Menu {...props} />);

    // Should not render items when menu is not open
    expect(screen.queryByText(props.items[0].label)).toBeNull();
    expect(screen.queryByText(props.items[1].label)).toBeNull();

    // Opens the menu when menuButton is clicked
    const menuButton = screen.getByTestId('menu_button');
    await user.click(menuButton);

    // Should only render items which are not hidden
    expect(screen.queryByText(props.items[0].label)).not.toBeNull();
    expect(screen.queryByText(props.items[1].label)).toBeNull();

    expect(screen.getByTestId('theme_toggle')).toBeDefined();
  });

  it('should not render theme toggle if showThemeToggle is falsy', async () => {
    const user = userEvent.setup();
    render(<Menu {...props} showThemeToggle={false} />);

    const menuButton = screen.getByTestId('menu_button');
    await user.click(menuButton);

    expect(screen.queryByTestId('theme_toggle')).toBeNull();
  });

  it('should call menu item onClick when item is clicked', async () => {
    const user = userEvent.setup();
    render(<Menu {...props} />);

    const menuButton = screen.getByTestId('menu_button');
    await user.click(menuButton);

    const menuItem = screen.getByText(props.items[0].label);
    await user.click(menuItem);

    expect(props.items[0].onClick).toHaveBeenCalled();
  });

  it('should close menu when escape key is clicked', async () => {
    const user = userEvent.setup();
    render(<Menu {...props} />);

    const menuButton = screen.getByTestId('menu_button');
    await user.click(menuButton);

    // Menu item is still rendered after space key event
    await user.keyboard('{Space}');
    expect(screen.queryByText(props.items[0].label)).not.toBeNull();

    // Menu item is no longer rendered after escape key event
    await user.keyboard('{Escape}');
    expect(screen.queryByText(props.items[0].label)).toBeNull();
  });

  it('should close menu when veil is clicked', async () => {
    const user = userEvent.setup();
    render(<Menu {...props} />);

    const menuButton = screen.getByTestId('menu_button');
    await user.click(menuButton);

    // Menu item is still rendered
    expect(screen.queryByText(props.items[0].label)).not.toBeNull();

    // Menu item is no longer rendered after veil is clicked
    await user.click(screen.getByTestId('menu_veil'));
    expect(screen.queryByText(props.items[0].label)).toBeNull();
  });
});
