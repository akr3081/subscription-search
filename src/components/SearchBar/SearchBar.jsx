import React from 'react';
import PropTypes from 'prop-types';
import styles from './SearchBar.module.css';

const SearchBar = ({ handleSubmit, className }) => {
  const handleSearch = e => {
    e.preventDefault();
    const formDataObj = {};

    const formData = new FormData(e.currentTarget);
    formData.forEach((value, key) => (formDataObj[key] = value));

    handleSubmit(formDataObj);
  };

  return (
    <form className={`${styles.searchBar} ${className}`} onSubmit={handleSearch}>
      <span>
        <label htmlFor="searchTerm">Search Term</label>
        <input id="searchTerm" name="searchTerm" maxLength="100" required />
      </span>

      <span>
        <label htmlFor="maxResults">Results Per Channel</label>
        <input id="maxResults" name="maxResults" type="number" min="1" max="10" defaultValue="3" required />
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
