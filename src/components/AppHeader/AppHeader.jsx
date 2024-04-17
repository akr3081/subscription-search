import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AuthModal from '../AuthModal/AuthModal.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import { SettingsIcon, YouTubeIcon } from '../Icon/Icon.jsx';
import styles from './AppHeader.module.css';

/**
 * App header with authentication form
 * @param {function} handleSubmitAuth - Handle auth form submit
 * @param {string} className - CSS class name
 */
const AppHeader = ({ handleSubmitAuth, handleSubmitSearch, isUserAuthenticated, className }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(!isUserAuthenticated);

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

        <div id="icons">
          <button
            className={styles.iconButton}
            onClick={() => {
              setIsAuthModalOpen(true);
            }}
          >
            <SettingsIcon />
          </button>
        </div>
      </div>
      <AuthModal
        isOpen={isAuthModalOpen}
        handleClose={() => {
          setIsAuthModalOpen(false);
        }}
        handleSubmit={handleAuthFormSubmit}
        className={styles.form}
      />
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
