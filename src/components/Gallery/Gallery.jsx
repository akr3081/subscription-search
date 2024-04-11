import React from 'react';
import PropTypes from 'prop-types';
import VideoCard from '../VideoCard/VideoCard.jsx';
import styles from './Gallery.module.css';

/**
 * Gallery container for displaying a list of
 */
const Gallery = ({ title, image, link, items }) => {
  return (
    <div className={styles.gallery}>
      <div className={styles.header}>
        <a href={link} target="_blank" className={styles.channelLink}>
          <img src={image?.url} alt={title} />
          <h2>{title}</h2>
        </a>
      </div>

      <div className={styles.items}>
        {items.map(item => (
          <VideoCard videoId={item.videoId} title={item.title} thumbnails={item.thumbnails} />
        ))}
      </div>
    </div>
  );
};

Gallery.propTypes = {
  title: PropTypes.string,
  image: PropTypes.object,
  link: PropTypes.string,
  items: PropTypes.array
};

export default Gallery;
