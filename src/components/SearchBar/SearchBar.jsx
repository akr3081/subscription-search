import React from 'react';
import PropTypes from 'prop-types';
import styles from './SearchBar.module.css';

const SearchBar = ({ handleSubmit, className }) => {
  return (
    <form className={`${styles.searchBar} ${className}`} onSubmit={handleSubmit}>
      <span>
        <label htmlFor="searchTerm">Search Term</label>
        <input id="searchTerm" name="searchTerm" maxLength="100" required />
      </span>
      <button type="submit">Search</button>
    </form>
  );
};

SearchBar.propTypes = {
  handleSubmitSearch: PropTypes.func,
  className: PropTypes.string
};

export default SearchBar;
