import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CLOSE_CTA, USAGE_STEPS } from '../../common/constants.js';
import InfoModal from './InfoModal.jsx';

describe('InfoModal', () => {
  const props = {
    isOpen: true,
    handleClose: jest.fn()
  };

  it('should render info modal component', () => {
    render(<InfoModal {...props} />);
    expect(screen.getAllByRole('img')[0].src.includes(USAGE_STEPS[0].image.url)).toEqual(true);
    expect(screen.getByText(CLOSE_CTA).tagName).toEqual('BUTTON');
  });

  it('should call handleClose when close button is clicked', async () => {
    const user = userEvent.setup();
    render(<InfoModal {...props} />);

    const closeButton = screen.getByText(CLOSE_CTA);
    await user.click(closeButton);

    expect(props.handleClose).toHaveBeenCalled();
  });
});
