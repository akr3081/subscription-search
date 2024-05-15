import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChannelsMock from '../../__mocks__/channels.json';
import useStore from '../../stores/useStore.js';
import { CLOSE_CTA, HISTORY_MODAL_HEADING } from '../../common/constants.js';
import HistoryModal from './HistoryModal.jsx';

describe('HistoryModal', () => {
  const props = {
    isOpen: true,
    handleClose: jest.fn(),
    handleSubmitSearch: jest.fn()
  };

  it('should render modal component', () => {
    render(<HistoryModal {...props} />);
    expect(screen.getByText(HISTORY_MODAL_HEADING)).toBeDefined();
  });

  it('should call handleClose when close button is clicked', async () => {
    const user = userEvent.setup();
    render(<HistoryModal {...props} />);

    const closeButton = await screen.queryByText(CLOSE_CTA);

    await user.click(closeButton);
    expect(props.handleClose).toHaveBeenCalled();
  });

  it('should call handleSubmitSearch when history item is clicked', async () => {
    useStore.setState({
      history: [
        {
          timestamp: '321',
          searchTerm: 'test',
          subscriptions: ChannelsMock.items,
          selectedSubscriptions: [ChannelsMock.items[0].id]
        }
      ]
    });
    const user = userEvent.setup();
    render(<HistoryModal {...props} />);

    const historyItem = await screen.getByText('test');

    await user.click(historyItem);
    expect(props.handleSubmitSearch).toHaveBeenCalled();
  });

  it('should remove history item when remove button is clicked', async () => {
    useStore.setState({
      history: [
        {
          timestamp: '8765',
          searchTerm: 'test1',
          subscriptions: ChannelsMock.items,
          selectedSubscriptions: [ChannelsMock.items[0].id]
        },
        {
          timestamp: '4321',
          searchTerm: 'test2',
          subscriptions: ChannelsMock.items,
          selectedSubscriptions: [ChannelsMock.items[1].id]
        }
      ]
    });
    const user = userEvent.setup();
    render(<HistoryModal {...props} />);

    expect(useStore.getState().history.length).toEqual(2);

    const removeIconButton = await screen.getAllByTestId('icon_button_remove')[0];
    await user.click(removeIconButton);

    expect(useStore.getState().history.length).toEqual(1);
  });
});
