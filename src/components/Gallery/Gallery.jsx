import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NewTabIcon } from '../Icon/Icon.jsx';
import IconButton from '../IconButton/IconButton.jsx';
import VideoCard from '../VideoCard/VideoCard.jsx';
import { FALLBACK_CHANNEL_TITLE, LOAD_MORE_CTA } from '../../common/constants.js';
import styles from './Gallery.module.css';

/**
 * Gallery container for displaying a list of items
 */
const Gallery = ({ title, image, link, items, showLoadMore, loadMoreItems, handleRemove }) => {
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
          <h2>{`${title ?? FALLBACK_CHANNEL_TITLE} (${items.length})`}</h2>
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
              <VideoCard videoId={item.videoId} title={item.title} videoAge={item.videoAge} views={item.views} duration={item.duration} thumbnails={item.thumbnails} key={`gallery_${item.videoId}`} />
            ))}
          </div>
          {showLoadMore ? (
            <div className={styles.loadMore}>
              <button onClick={loadMoreItems}>
                <h3>{LOAD_MORE_CTA}</h3>
              </button>
            </div>
          ) : null}
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
  showLoadMore: PropTypes.bool,
  loadMoreItems: PropTypes.func,
  handleRemove: PropTypes.func
};

export default Gallery;
