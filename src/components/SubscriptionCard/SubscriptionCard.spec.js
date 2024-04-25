import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SubscriptionCard from './SubscriptionCard.jsx';

describe('SubscriptionCard', () => {
  const props = { name: 'mock-name', image: 'mock-image', isSelected: false, handleSelect: jest.fn() };

  it('should render card component with props', () => {
    render(<SubscriptionCard {...props} />);

    expect(screen.getByRole('heading').textContent).toEqual(props.name);
    expect(screen.getByRole('img').src.includes(props.image)).toEqual(true);
    expect(screen.getByRole('button').className.includes('isSelected')).toEqual(false);
  });

  it('button should have isSelected className if isSelected prop is truthy', () => {
    render(<SubscriptionCard {...props} isSelected />);
    expect(screen.getByRole('button').className.includes('isSelected')).toEqual(true);
  });

  it('should call handleSelect when button is clicked', async () => {
    const user = userEvent.setup();
    render(<SubscriptionCard {...props} />);

    await user.click(screen.getByRole('button'));
    expect(props.handleSelect).toHaveBeenCalled();
  });
});
