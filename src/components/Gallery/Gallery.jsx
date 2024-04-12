import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ArrowIcon, MoreIcon } from '../Icon/Icon.jsx';
import VideoCard from '../VideoCard/VideoCard.jsx';
import styles from './Gallery.module.css';

/**
 * Gallery container for displaying a list of
 */
const Gallery = ({ id, title, image, link, items, loadMoreItems }) => {
  const [isOpen, setIsOpen] = useState(false);

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
        <div>
          <div className={styles.items}>
            {items.map(item => (
              <VideoCard videoId={item.videoId} title={item.title} thumbnails={item.thumbnails} />
            ))}
          </div>
          <div className={styles.loadMore}>
            <button onClick={loadMoreItems}>
              <h3>Load More</h3>
              <MoreIcon />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

Gallery.propTypes = {
  title: PropTypes.string,
  image: PropTypes.object,
  link: PropTypes.string,
  items: PropTypes.array,
  loadMoreItems: PropTypes.func
};

export default Gallery;
