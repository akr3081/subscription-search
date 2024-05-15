import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '../IconButton/IconButton.jsx';
import { SEARCH_VALIDATION_ERROR } from '../../common/constants.js';
import useStore from '../../stores/useStore.js';
import styles from './SearchBar.module.css';

const SearchBar = ({ handleSubmit, isSearchEnabled, isLoading, className }) => {
  const { searchTerm } = useStore();

  const submitSearch = e => {
    e.preventDefault();

    if (!isSearchEnabled) {
      alert(SEARCH_VALIDATION_ERROR);
      return false;
    }

    const formDataObj = {};
    const formData = new FormData(e.currentTarget);
    formData.forEach((value, key) => (formDataObj[key] = value));

    handleSubmit(formDataObj);
  };

  return (
    <form className={`${styles.searchBar} ${className}`} onSubmit={submitSearch}>
      <input
        id="searchTerm"
        name="searchTerm"
        maxLength="100"
        placeholder="Search"
        defaultValue={searchTerm}
        key={searchTerm}
        required
      />
      <IconButton
        iconName="search"
        isLoading={isLoading}
        className={styles.submit}
        type="submit"
        disabled={isLoading}
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
