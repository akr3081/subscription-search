import React from 'react';
import PropTypes from 'prop-types';
import useStore from '../../stores/useStore.js';
import Modal from '../Modal/Modal.jsx';
import styles from './AuthModal.module.css';

const AuthModal = ({ isOpen, handleClose, handleSubmit, className, isUserAuthenticated }) => {
  const { apiKey, channelId, reset } = useStore();

  return (
    <Modal isOpen={isOpen} handleClose={handleClose} className={`${styles.modal} ${className}`}>
      {isUserAuthenticated ? (
        <button className={styles.clearButton} type="button" onClick={() => {
          reset();
          window.location.reload();
        }}>
          Clear Local Data
        </button>
      ) : null}

      <form className={`${styles.form} ${className}`} onSubmit={handleSubmit}>
        <div className={styles.fields}>
          <div className={styles.field}>
            <label htmlFor="apiKey">API Key</label>
            <input id="apiKey" name="apiKey" placeholder="Enter a YouTube API Key" defaultValue={apiKey} required />
          </div>

          <div className={styles.field}>
            <label htmlFor="channelId">Channel ID</label>
            <input id="channelId" name="channelId" placeholder="Enter your channel ID" defaultValue={channelId} required />
          </div>
        </div>

        <button className={styles.submitButton} type="submit">Save</button>
      </form>
    </Modal>
  );
};

AuthModal.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  isUserAuthenticated: PropTypes.bool
};

export default AuthModal;