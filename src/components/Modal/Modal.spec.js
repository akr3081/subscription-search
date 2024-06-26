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
    expect(screen.queryByTestId('modal_veil')).not.toBeNull();
  });

  it('should not render modal component without isOpen prop', () => {
    render(<Modal {...props} isOpen={false} />);
    expect(screen.queryByTestId('modal_veil')).toBeNull();
  });

  it('should call handleClose when veil is clicked', async () => {
    const handleCloseMock = jest.fn();
    const user = userEvent.setup();
    render(<Modal {...props} handleClose={handleCloseMock} />);

    const veil = screen.getByTestId('modal_veil');
    await user.click(veil);

    expect(handleCloseMock).toHaveBeenCalled();
  });

  it('should call handleClose when escape key is clicked', async () => {
    const handleCloseMock = jest.fn();
    const user = userEvent.setup();
    render(<Modal {...props} handleClose={handleCloseMock} />);

    await user.keyboard('{Space}');
    expect(handleCloseMock).not.toHaveBeenCalled();

    await user.keyboard('{Escape}');
    expect(handleCloseMock).toHaveBeenCalled();
  });
});
