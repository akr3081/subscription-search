import React from 'react';
import { render } from '@testing-library/react';
import Loader from './Loader.jsx';

describe('Loader', () => {
  it('should render loader component', () => {
    const { container } = render(<Loader />);
    expect(container).toBeDefined();
  });
});
