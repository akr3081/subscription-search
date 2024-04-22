import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NewTabIcon } from '../Icon/Icon.jsx';
import IconButton from '../IconButton/IconButton.jsx';
import VideoCard from '../VideoCard/VideoCard.jsx';
import styles from './Gallery.module.css';

/**
 * Gallery container for displaying a list of
 */
const Gallery = ({ title, image, link, items, loadMoreItems, handleRemove }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.gallery}>
      <div className={styles.header}>
        <div className={styles.channel} onClick={() => {
          setIsOpen(!isOpen);
        }}>
          <IconButton
            iconName="arrow"
            className={isOpen ? styles.open : ''}
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          />
          <img src={image?.url} alt={title} referrerPolicy="no-referrer" />
          <h2>{`${title} (${items.length})`}</h2>
        </div>

        <div className={styles.icons}>
          <button className={styles.linkButton}>
            <a href={link} target="_blank" tabIndex="-1">
              <NewTabIcon />
            </a>
          </button>


          <IconButton iconName="remove" onClick={handleRemove} />
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
  loadMoreItems: PropTypes.func,
  handleRemove: PropTypes.func
};

export default Gallery;
