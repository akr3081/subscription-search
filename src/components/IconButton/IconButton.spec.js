import React from 'react';
import { render, screen } from '@testing-library/react';
import IconButton from './IconButton.jsx';
import Icon from '../Icon/Icon.jsx';

describe('IconButton', () => {
  it('should render button component for each icon', () => {
    const icons = Object.keys(Icon);

    icons.forEach(iconName => {
      render(<IconButton iconName={iconName} />);
      expect(screen.getByTestId(`icon_button_${iconName}`)).toBeDefined();
    });
  });
});
