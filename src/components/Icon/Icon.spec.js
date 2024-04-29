import React from 'react';
import { render } from '@testing-library/react';
import Icon from '../Icon/Icon.jsx';

describe('Icon', () => {
  it('should render component for each icon', () => {
    const icons = Object.keys(Icon);

    icons.forEach(iconName => {
      const IconComponent = Icon[iconName];
      const { container } = render(<IconComponent />);
      expect(container).toBeDefined();
    });
  });
});
