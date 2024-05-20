import React from 'react';
import PropTypes from 'prop-types';
import useStore from '../../stores/useStore.js';
import Modal from '../Modal/Modal.jsx';
import ThemeToggle from '../ThemeToggle/ThemeToggle.jsx';
import { CANCEL_CTA, SAVE_CTA } from '../../common/constants.js';
import styles from './AuthModal.module.css';

const AuthModal = ({ isOpen, handleClose, handleSubmit, className }) => {
  const { userData } = useStore();

  return (
    <Modal isOpen={isOpen} handleClose={handleClose} className={`${styles.modal} ${className}`}>
      <div className={styles.headerContainer}>
        <ThemeToggle />
      </div>

      <form className={`${styles.form} ${className}`} onSubmit={handleSubmit} data-testid="auth_form">
        <div className={styles.fields}>
          <div className={styles.field}>
            <label htmlFor="apiKey">API Key</label>
            <input
              id="apiKey"
              name="apiKey"
              placeholder="Enter a YouTube API Key"
              defaultValue={userData.apiKey}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="channelId">Channel ID</label>
            <input
              id="channelId"
              name="channelId"
              placeholder="Enter your channel ID"
              defaultValue={userData.channelId}
              required
            />
          </div>
        </div>

        <div className={styles.buttons}>
          <button className={styles.closeButton} onClick={handleClose} type="button">
            {CANCEL_CTA}
          </button>
          <button className={styles.submitButton} type="submit">
            {SAVE_CTA}
          </button>
        </div>
      </form>
    </Modal>
  );
};

AuthModal.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string
};

export default AuthModal;
