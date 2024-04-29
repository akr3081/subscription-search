import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MappedSearchResults from '../../__mocks__/mappedSearchResults.json';
import { LOAD_MORE_CTA, YOUTUBE_BASE_URL } from '../../common/constants.js';
import Gallery from './Gallery.jsx';

describe('Gallery', () => {
  const props = {
    title: MappedSearchResults[0].title,
    image: MappedSearchResults[0].image,
    link: `${YOUTUBE_BASE_URL}${MappedSearchResults[0].id}`,
    items: MappedSearchResults[0].items,
    loadMoreItems: jest.fn(),
    handleRemove: jest.fn()
  };

  it('should render gallery component with props', async () => {
    const user = userEvent.setup();
    render(<Gallery {...props} />);

    // Renders elements of header
    expect(screen.getByText(`${props.title} (${props.items.length})`).tagName).toEqual('H2');
    expect(screen.getByRole('img').src).toEqual(props.image.url);

    // Gallery body is not rendered until arrow icon is clicked
    expect(screen.queryByText(LOAD_MORE_CTA)).toBeNull();

    const arrowIconButton = screen.getByTestId('icon_button_arrow');
    await user.click(arrowIconButton);

    expect(screen.queryByText(LOAD_MORE_CTA)).not.toBeNull();
  });

  it('should call loadMoreItems when load more cta is clicked', async () => {
    const user = userEvent.setup();
    render(<Gallery {...props} />);

    // Gallery body is not rendered until arrow icon is clicked
    await user.click(screen.getByTestId('icon_button_arrow'));

    await user.click(screen.getByText(LOAD_MORE_CTA));
    expect(props.loadMoreItems).toHaveBeenCalled();
  });

  it('should call handleRemove when header remove icon button is clicked', async () => {
    const user = userEvent.setup();
    render(<Gallery {...props} />);

    await user.click(screen.getByTestId('icon_button_remove'));
    expect(props.handleRemove).toHaveBeenCalled();
  });
});
