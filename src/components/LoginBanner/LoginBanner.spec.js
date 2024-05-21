import React from 'react';
import { render, screen } from '@testing-library/react';
import { LOGIN_BANNER_CONTENT } from '../../common/constants.js';
import LoginBanner from './LoginBanner.jsx';

describe('LoginBanner', () => {
  it('should render banner component', () => {
    render(<LoginBanner />);

    expect(screen.getByText(LOGIN_BANNER_CONTENT.HEADING)).toBeDefined();
    expect(screen.getByText(LOGIN_BANNER_CONTENT.SUBHEADING)).toBeDefined();
  });
});
