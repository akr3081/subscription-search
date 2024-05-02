import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '../IconButton/IconButton.jsx';
import styles from './SearchBar.module.css';

const SearchBar = ({ handleSubmit, isSearchEnabled, className }) => {
  const submitSearch = (e) => {
    e.preventDefault();

    if (!isSearchEnabled) {
      alert('Please select subscriptions to search');
      return false;
    }

    const formDataObj = {};
    const formData = new FormData(e.currentTarget);
    formData.forEach((value, key) => (formDataObj[key] = value));

    handleSubmit(formDataObj);
  };

  return (
    <form className={`${styles.searchBar} ${className}`} onSubmit={submitSearch} >
      <input id="searchTerm" name="searchTerm" maxLength="100" placeholder="Search" required />
      <IconButton
        iconName="search"
        className={styles.submit}
        type="submit"
      />
    </form>
  );
};

SearchBar.propTypes = {
  handleSubmitSearch: PropTypes.func,
  isSearchEnabled: PropTypes.bool,
  className: PropTypes.string
};

export default SearchBar;
