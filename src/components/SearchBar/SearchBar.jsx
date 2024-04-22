import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '../IconButton/IconButton.jsx';
import styles from './SearchBar.module.css';

const SearchBar = ({ handleSubmit, className }) => {
  return (
    <form className={`${styles.searchBar} ${className}`} onSubmit={handleSubmit}>
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
  className: PropTypes.string
};

export default SearchBar;
