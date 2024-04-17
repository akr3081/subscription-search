import React from 'react';
import PropTypes from 'prop-types';
import { SearchIcon } from '../Icon/Icon.jsx';
import styles from './SearchBar.module.css';

const SearchBar = ({ handleSubmit, className }) => {
  return (
    <form className={`${styles.searchBar} ${className}`} onSubmit={handleSubmit}>
      <input id="searchTerm" name="searchTerm" maxLength="100" placeholder="Search" required />
      <button type="submit">{<SearchIcon />}</button>
    </form>
  );
};

SearchBar.propTypes = {
  handleSubmitSearch: PropTypes.func,
  className: PropTypes.string
};

export default SearchBar;
