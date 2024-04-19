import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AuthModal from '../AuthModal/AuthModal.jsx';
import InfoModal from '../InfoModal/InfoModal.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import { InfoIcon, SettingsIcon, YouTubeIcon } from '../Icon/Icon.jsx';
import styles from './AppHeader.module.css';

/**
 * App header with authentication form
 * @param {function} handleSubmitAuth - Handle auth form submit
 * @param {string} className - CSS class name
 */
const AppHeader = ({ handleSubmitAuth, handleSubmitSearch, isUserAuthenticated, className }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(!isUserAuthenticated);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  useEffect(() => {
    setIsAuthModalOpen(!isUserAuthenticated);
  }, [isUserAuthenticated]);

  const handleAuthFormSubmit = e => {
    e.preventDefault();
    const formDataObj = {};

    const formData = new FormData(e.currentTarget);
    formData.forEach((value, key) => (formDataObj[key] = value));

    handleSubmitAuth(formDataObj);
  };

  const handleSearchBarSubmit = e => {
    e.preventDefault();
    const formDataObj = {};

    const formData = new FormData(e.currentTarget);
    formData.forEach((value, key) => (formDataObj[key] = value));

    handleSubmitSearch(formDataObj);
  };

  return (
    <>
      <div className={`${styles.header} ${className}`}>
        <YouTubeIcon className={styles.headerIcon} />

        {isUserAuthenticated ? (<SearchBar handleSubmit={handleSearchBarSubmit} />) : null}

        <div className={styles.icons}>
          <button
            onClick={() => {
              setIsInfoModalOpen(true);
            }}
          >
            <InfoIcon />
          </button>
          <button
            onClick={() => {
              setIsAuthModalOpen(true);
            }}
          >
            <SettingsIcon />
          </button>
        </div>
      </div>

      <div id="modals">
        <AuthModal
          isOpen={isAuthModalOpen}
          handleClose={() => {
            setIsAuthModalOpen(false);
          }}
          handleSubmit={handleAuthFormSubmit}
          className={styles.form}
        />

        <InfoModal
          isOpen={isInfoModalOpen}
          handleClose={() => {
            setIsInfoModalOpen(false);
          }}
          className={styles.form}
        />
      </div>
    </>
  );
};

AppHeader.propTypes = {
  handleSubmitAuth: PropTypes.func,
  handleSubmitSearch: PropTypes.func,
  isUserAuthenticated: PropTypes.bool,
  className: PropTypes.string
};

export default AppHeader;
