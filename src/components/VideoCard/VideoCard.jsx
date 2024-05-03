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
const VideoCard = ({ videoId, title, views, videoAge, duration, thumbnails }) => (
  <a href={`${YOUTUBE_BASE_URL}${videoId}`} target="_blank" className={styles.videoCard}>
    <div className={styles.imageContainer}>
      <img src={thumbnails?.medium?.url} referrerPolicy="no-referrer" />
      {duration ? (<p className={styles.imageOverlay}>{duration}</p>) : null}
    </div>

    <div className={styles.cardContent}>
      <h3 className={styles.title}>{title}</h3>
      <span className={styles.byline}>
        <p>{views}</p>
        <span className={styles.dot} />
        <p>{videoAge}</p>
      </span>
    </div>
  </a>
);


VideoCard.propTypes = {
  videoId: PropTypes.string,
  title: PropTypes.string,
  views: PropTypes.string,
  videoAge: PropTypes.string,
  duration: PropTypes.string,
  thumbnails: PropTypes.object
};

export default VideoCard;
