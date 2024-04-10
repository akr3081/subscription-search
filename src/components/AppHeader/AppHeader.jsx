import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AuthForm from '../AuthForm/AuthForm.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import { SearchIcon, SettingsIcon, YouTubeIcon } from '../Icon/Icon.jsx';
import styles from './AppHeader.module.css';

/**
 * App header with authentication form
 * @param {function} handleSubmitAuth - Handle auth form submit
 * @param {string} className - CSS class name
 */
const AppHeader = ({ handleSubmitAuth, handleSubmitSearch, isUserAuthenticated, className }) => {
  const [isAuthFormOpen, setIsAuthFormOpen] = useState(!isUserAuthenticated);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(isUserAuthenticated);

  useEffect(() => {
    setIsAuthFormOpen(!isUserAuthenticated);
    setIsSearchBarOpen(isUserAuthenticated);
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
    <div className={`${styles.header} ${className}`}>
      <YouTubeIcon className={styles.headerIcon} />

      <div id="form">
        {isAuthFormOpen ? <AuthForm handleSubmit={handleAuthFormSubmit} className={styles.form} /> : null}

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
  handleSubmitAuth: PropTypes.func,
  handleSubmitSearch: PropTypes.func,
  isUserAuthenticated: PropTypes.bool,
  className: PropTypes.string
};

export default AppHeader;
