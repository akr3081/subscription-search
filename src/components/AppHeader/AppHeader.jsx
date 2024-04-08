import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AuthForm from '../AuthForm/AuthForm.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import styles from './AppHeader.module.css';
import { SearchIcon, SettingsIcon, YouTubeIcon } from '../Icon/Icon.jsx';

/**
 * App header with authentication form
 * @param {object} userData - Contains user data
 * @param {function} handleSubmitAuth - Handle auth form submit
 * @param {string} className - CSS class name
 */
const AppHeader = ({ userData, handleSubmitAuth, handleSubmitSearch, className }) => {
  const [isAuthFormOpen, setIsAuthFormOpen] = useState(!userData.apiKey);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  const handleAuthFormSubmit = e => {
    e.preventDefault();
    const formDataObj = {};

    const formData = new FormData(e.currentTarget);
    formData.forEach((value, key) => (formDataObj[key] = value));

    handleSubmitAuth(formDataObj);

    // FIXME: Only do this if auth is successful
    setIsUserAuthenticated(true);
    setIsAuthFormOpen(false);
    setIsSearchBarOpen(true);
  };

  const handleSearchBarSubmit = e => {
    e.preventDefault();
    const formDataObj = {};

    const formData = new FormData(e.currentTarget);
    formData.forEach((value, key) => (formDataObj[key] = value));

    handleSubmitSearch(formDataObj);
  };

  return (
    <div className={`${styles.header} ${className}`}>
      <YouTubeIcon className={styles.headerIcon} />

      <div id="form">
        {isAuthFormOpen ? (
          <AuthForm userData={userData} handleSubmit={handleAuthFormSubmit} className={styles.form} />
        ) : null}

        {isSearchBarOpen ? <SearchBar handleSubmit={handleSearchBarSubmit} /> : null}
      </div>

      <div id="buttons">
        <button
          disabled={!isUserAuthenticated}
          className={styles.iconButton}
          onClick={() => {
            setIsAuthFormOpen(false);
            setIsSearchBarOpen(true);
          }}
        >
          <SearchIcon />
        </button>

        <button
          className={styles.iconButton}
          onClick={() => {
            setIsAuthFormOpen(true);
            setIsSearchBarOpen(false);
          }}
        >
          <SettingsIcon />
        </button>
      </div>
    </div>
  );
};

AppHeader.propTypes = {
  userData: PropTypes.objectOf({
    apiKey: PropTypes.string,
    channelId: PropTypes.string
  }),
  handleSubmitAuth: PropTypes.func,
  handleSubmitSearch: PropTypes.func,
  className: PropTypes.string
};

export default AppHeader;
