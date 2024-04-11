import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ArrowIcon } from '../Icon/Icon.jsx';
import VideoCard from '../VideoCard/VideoCard.jsx';
import styles from './Gallery.module.css';

/**
 * Gallery container for displaying a list of
 */
const Gallery = ({ title, image, link, items }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={styles.gallery}>
      <div className={styles.header}>
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className={`${styles.arrow} ${isOpen ? styles.open : ''}`}
        >
          <ArrowIcon />
        </button>
        <a href={link} target="_blank" className={styles.channelLink}>
          <img src={image?.url} alt={title} />
          <h2>{`${title} (${items.length})`}</h2>
        </a>
      </div>

      {isOpen ? (
        <div className={styles.items}>
          {items.map(item => (
            <VideoCard videoId={item.videoId} title={item.title} thumbnails={item.thumbnails} />
          ))}
        </div>
      ) : null}
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
