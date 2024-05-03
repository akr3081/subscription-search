import React from 'react';
import PropTypes from 'prop-types';
import { YOUTUBE_BASE_URL } from '../../common/constants.js';
import styles from './VideoCard.module.css';

/**
 * Card component for video
 * @param {string} videoId - Video id
 * @param {string} title - Video title
 * @param {object} thumbnails - Contains image data
 */
const VideoCard = ({ videoId, title, views, publishedDate, thumbnails }) => {
  /**
   * Returns a formatted string for how many views a given video has.
   * @param {number} views - The number of views for a given video
   */
  const formatViewsString = (views) => {
    // FIXME: Implement view count logic
    return '2.7k views';
  }

  /**
   * Returns a formatted string of how long ago a given timestamp was
   * @param {string} timestamp - Datetime string of when the video was published
   */
  const formatDateString = (timestamp) => {
    const date = new Date(timestamp);
    const secondsAgo = (Math.floor((Date.now()) - date) / 1000);

    const yearsAgo = Math.floor(secondsAgo / 31536000);
    if (yearsAgo > 1) return `${yearsAgo} years ago`;
    if (yearsAgo === 1) return `${yearsAgo} year ago`;

    const monthsAgo = Math.floor(secondsAgo / 2592000);
    if (monthsAgo > 1) return `${monthsAgo} months ago`;
    if (monthsAgo === 1) return `${monthsAgo} month ago`;

    const daysAgo = Math.floor(secondsAgo / 864000);
    if (daysAgo > 1) return `${daysAgo} days ago`;
    if (daysAgo === 1) return `${daysAgo} days ago`;

    const hoursAgo = Math.floor(hoursAgo / 3600);
    if (hoursAgo > 1) return `${hoursAgo} hours ago`;
    if (hoursAgo === 1) return `${hoursAgo} hour ago`;

    const minutesAgo = Math.floor(minutesAgo / 60);
    if (minutesAgo > 1) return `${minutesAgo} minutes ago`;
    if (minutesAgo === 1) return `${minutesAgo} minutes ago`;

    return 'just now';
  }

  return (
    <a href={`${YOUTUBE_BASE_URL}${videoId}`} target="_blank" className={styles.videoCard}>
      <img src={thumbnails?.medium?.url} referrerPolicy="no-referrer" />

      <div className={styles.cardContent}>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.byline}>
          <p>{formatViewsString(views)}</p>
          <span className={styles.dot} />
          <p>{formatDateString(publishedDate)}</p>
        </span>
      </div>
    </a>
  );
}


VideoCard.propTypes = {
  videoId: PropTypes.string,
  title: PropTypes.string,
  views: PropTypes.number,
  publishedDate: PropTypes.string,
  thumbnails: PropTypes.object
};

export default VideoCard;
