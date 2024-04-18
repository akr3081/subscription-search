import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ArrowIcon, NewTabIcon, RemoveIcon } from '../Icon/Icon.jsx';
import VideoCard from '../VideoCard/VideoCard.jsx';
import styles from './Gallery.module.css';

/**
 * Gallery container for displaying a list of
 */
const Gallery = ({ title, image, link, items, loadMoreItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.gallery}>
      <div className={styles.header}>
        <div className={styles.channel} onClick={() => {
          setIsOpen(!isOpen);
        }}>
          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            className={`${styles.iconButton} ${isOpen ? styles.open : ''}`}
          >
            <ArrowIcon />
          </button>
          <img src={image?.url} alt={title} referrerPolicy="no-referrer" />
          <h2>{`${title} (${items.length})`}</h2>
        </div>

        <div className={styles.icons}>
          <button className={styles.iconButton}>
            <a href={link} target="_blank" tabIndex="-1">
              <NewTabIcon />
            </a>
          </button>


          <button className={styles.iconButton}>
            <RemoveIcon />
          </button>
        </div>
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
