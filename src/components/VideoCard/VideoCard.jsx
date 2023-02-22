import React from 'react';
import PropTypes from 'prop-types';
import styles from './VideoCard.module.css';

/**
 * Card component for video
 * @param {string} videoId - Video id
 * @param {string} title - Video title
 * @param {object} thumbnails - Contains image data
 * @param {string} channelTitle - Name of the channel
 */
const VideoCard = ({ videoId, title, thumbnails, channelTitle }) => {
  return (
    <a href={`https://youtube.com/watch?v=${videoId}`} className={styles.videoCard}>
      <img src={thumbnails?.medium?.url} height={thumbnails?.medium?.height} width={thumbnails?.medium?.width} />

      <div className={styles.cardContent}>
        <h2>{title}</h2>
        <h3>{channelTitle}</h3>
      </div>
    </a>
  );
};

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
  }),
  channelTitle: PropTypes.string
};

export default VideoCard;
