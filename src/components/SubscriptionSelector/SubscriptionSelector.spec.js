import React from 'react';
import { render, screen } from '@testing-library/react';
import { SUBS_HEADER } from '../../common/constants';
import SubscriptionsMock from '../../__mocks__/subscriptions.json';
import SubscriptionSelector from './SubscriptionSelector.jsx';
import userEvent from '@testing-library/user-event';

describe('SubscriptionSelector', () => {
  const props = {
    subscriptions: SubscriptionsMock.items,
    selectedSubscriptions: ['UC-oYqxpi6TO1J7BjQksSuOA', 'UC-uPNldCnPeasW6iUSD2ODQ'],
    setSelectedSubscriptions: jest.fn(),
    handleRefresh: jest.fn(),
    isUserAuthenticated: true
  };

  it('should render component with props', () => {
    render(<SubscriptionSelector {...props} />);

    // Renders elements of header
    expect(screen.getByText(`${SUBS_HEADER} (2/49)`)).toBeDefined();
    expect(screen.getByTestId('icon_button_sync')).toBeDefined();

    // Should render divider when there are selected items
    expect(screen.getByRole('separator')).toBeDefined();

    // Add/Substract icon buttons match number of selected/unselected subs
    expect(screen.getAllByTestId('icon_button_subtract').length).toEqual(props.selectedSubscriptions.length);
    expect(screen.getAllByTestId('icon_button_add').length).toEqual(
      props.subscriptions.length - props.selectedSubscriptions.length
    );
  });

  it('should not render component if user is not authenticated', () => {
    render(<SubscriptionSelector {...props} isUserAuthenticated={false} />);

    // Header elements are not found
    expect(screen.queryByText(`${SUBS_HEADER} (2/49)`)).toBeNull();
    expect(screen.queryByTestId('icon_button_sync')).toBeNull();

    // Subscriptions are not found
    expect(screen.queryAllByTestId('icon_button_subtract').length).toEqual(0);
    expect(screen.queryAllByTestId('icon_button_add').length).toEqual(0);
  });

  it('should render component with no subscriptions', () => {
    render(<SubscriptionSelector {...props} subscriptions={[]} selectedSubscriptions={[]} />);

    // Renders elements of header
    expect(screen.queryByText(`${SUBS_HEADER} (0/0)`)).toBeDefined();
    expect(screen.queryByTestId('icon_button_sync')).toBeDefined();

    // Subscriptions are empty
    expect(screen.queryAllByTestId('icon_button_subtract').length).toEqual(0);
    expect(screen.queryAllByTestId('icon_button_add').length).toEqual(0);
  });

  it('should not render divider if none of the subscriptions have been selected', () => {
    render(<SubscriptionSelector {...props} selectedSubscriptions={[]} />);
    expect(screen.queryByRole('seperator')).toBeNull();
  });

  it('should call setSelectedSubscriptions when SubscriptionCard add iconButton is clicked', async () => {
    const user = userEvent.setup();
    render(<SubscriptionSelector {...props} />);

    const subCardAddIconButton = screen.getAllByTestId('icon_button_add')[0];
    await user.click(subCardAddIconButton);

    expect(props.setSelectedSubscriptions).toHaveBeenLastCalledWith([
      'UC-oYqxpi6TO1J7BjQksSuOA',
      'UC-uPNldCnPeasW6iUSD2ODQ',
      'UC16fG7-summGsrcqkkYb6hg'
    ]);
  });

  it('should call setSelectedSubscriptions when SubscriptionCard subtract iconButton is clicked', async () => {
    const user = userEvent.setup();
    render(<SubscriptionSelector {...props} />);

    const subCardSubtractIconButton = screen.getAllByTestId('icon_button_subtract')[0];
    await user.click(subCardSubtractIconButton);

    expect(props.setSelectedSubscriptions).toHaveBeenLastCalledWith(['UC-uPNldCnPeasW6iUSD2ODQ']);
  });

  it('should call handleRefresh when header sync button is clicked', async () => {
    const user = userEvent.setup();
    render(<SubscriptionSelector {...props} />);

    const syncIconButton = screen.getByTestId('icon_button_sync');
    await user.click(syncIconButton);

    expect(props.handleRefresh).toHaveBeenCalled();
  });
});