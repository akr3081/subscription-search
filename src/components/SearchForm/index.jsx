import React from 'react';
import styles from './SearchForm.module.css';

const SearchForm = () => {
  return (
    <div className={styles.searchForm}>
      <input id="search_input" placeholder="Search Term" maxLength="100" />
      <input id="search_max_results" type="number" min="1" max="10" value="3" />
      <button>Search</button>
    </div>
  );
};

export default SearchForm;
