import React from 'react';
import { render, screen } from '@testing-library/react';
import VideoCard from './VideoCard.jsx';
import { YOUTUBE_BASE_URL } from '../../common/constants.js';

describe('VideoCard', () => {
  it('should render card component with props', () => {
    const props = {
      videoId: 'mock-id-123',
      title: 'mock-title-123',
      duration: '12:21',
      views: '1.2k views',
      videoAge: '2 years old',
      thumbnails: {
        medium: {
          url: 'https://i.ytimg.com/vi/q7EbdAxWQ9g/default.jpg',
          width: 120,
          height: 90
        }
      }
    };
    render(<VideoCard {...props} />);

    expect(screen.getByRole('link').href).toEqual(`${YOUTUBE_BASE_URL}${props.videoId}`);
    expect(screen.getByRole('img').src).toEqual(props.thumbnails.medium.url);
    expect(screen.getByText(props.title).tagName).toEqual('H3');
  });
});
