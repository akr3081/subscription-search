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
const VideoCard = ({ videoId, title, thumbnails }) => (
  <a href={`${YOUTUBE_BASE_URL}${videoId}`} target="_blank" className={styles.videoCard}>
    <img src={thumbnails?.medium?.url} referrerPolicy="no-referrer" />

    <div className={styles.cardContent}>
      <h3>{title}</h3>
    </div>
  </a>
);


VideoCard.propTypes = {
  videoId: PropTypes.string,
  title: PropTypes.string,
  thumbnails: PropTypes.objectOf({
    default: PropTypes.objectOf({
      url: PropTypes.string,
      height: PropTypes.number,
      width: PropTypes.number
    }),
    medium: PropTypes.objectOf({
      url: PropTypes.string,
      height: PropTypes.number,
      width: PropTypes.number
    }),
    high: PropTypes.objectOf({
      url: PropTypes.string,
      height: PropTypes.number,
      width: PropTypes.number
    })
  })
};

export default VideoCard;
