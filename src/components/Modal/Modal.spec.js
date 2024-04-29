import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from './Modal.jsx';

describe('Modal', () => {
  const props = {
    isOpen: true,
    handleClose: jest.fn()
  };

  it('should render modal component with isOpen prop', () => {
    render(<Modal {...props} />);
    expect(screen.queryByTestId('modal-veil')).not.toBeNull();
  });

  it('should not render modal component without isOpen prop', () => {
    render(<Modal {...props} isOpen={false} />);
    expect(screen.queryByTestId('modal-veil')).toBeNull();
  });

  it('should call handleClose when veil is clicked', async () => {
    const user = userEvent.setup();
    render(<Modal {...props} />);

    const veil = screen.getByTestId('modal-veil');
    await user.click(veil);

    expect(props.handleClose).toHaveBeenCalled();
  });
});
