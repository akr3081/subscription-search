import React from 'react';
import styles from './VideoCard.module.css';

const VideoCard = ({ videoId, title, thumbnails, channelTitle }) => {
  return (
    <div className={styles.videoCard}>
      <a href={`https://youtube.com/watch?v=${videoId}`}>
        <img src={thumbnails.medium.url} height={thumbnails.medium.height} width={thumbnails.medium.width} />
        <h4>{title}</h4>
      </a>
    </div>
  );
};

export default VideoCard;
