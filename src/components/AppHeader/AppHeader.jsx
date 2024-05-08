import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AuthModal from '../AuthModal/AuthModal.jsx';
import IconButton from '../IconButton/IconButton.jsx';
import InfoModal from '../InfoModal/InfoModal.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import { YouTubeIcon } from '../Icon/Icon.jsx';
import styles from './AppHeader.module.css';

/**
 * App header with authentication form
 * @param {function} handleSubmitAuth - Handle auth form submit
 * @param {string} className - CSS class name
 */
const AppHeader = ({ handleSubmitAuth, handleSubmitSearch, isUserAuthenticated, isSearchEnabled, className }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(!isUserAuthenticated);

  const handleAuthFormSubmit = async e => {
    e.preventDefault();
    const formDataObj = {};

    const formData = new FormData(e.currentTarget);
    formData.forEach((value, key) => (formDataObj[key] = value));

    const isAuthenticated = await handleSubmitAuth(formDataObj);
    if (isAuthenticated) setIsAuthModalOpen(false);
  };

  return (
    <>
      <div className={`${styles.header} ${className}`}>
        <YouTubeIcon className={styles.headerIcon} />

        {isUserAuthenticated ? <SearchBar handleSubmit={handleSubmitSearch} isSearchEnabled={isSearchEnabled} /> : null}

        <div className={styles.icons}>
          <IconButton
            iconName="info"
            className={styles.icon}
            onClick={() => {
              setIsInfoModalOpen(true);
            }}
          />

          <IconButton
            iconName="settings"
            className={styles.icon}
            onClick={() => {
              setIsAuthModalOpen(true);
            }}
          />
        </div>
      </div>

      <div id="modals">
        <InfoModal
          isOpen={isInfoModalOpen}
          handleClose={() => {
            setIsInfoModalOpen(false);
          }}
          className={styles.form}
        />

        <AuthModal
          isOpen={isAuthModalOpen}
          handleClose={() => {
            setIsAuthModalOpen(false);
          }}
          handleSubmit={handleAuthFormSubmit}
          className={styles.form}
          isUserAuthenticated={isUserAuthenticated}
        />
      </div>
    </>
  );
};

AppHeader.propTypes = {
  handleSubmitAuth: PropTypes.func,
  handleSubmitSearch: PropTypes.func,
  isUserAuthenticated: PropTypes.bool,
  isSearchEnabled: PropTypes.bool,
  className: PropTypes.string
};

export default AppHeader;
