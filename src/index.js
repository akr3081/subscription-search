import React from 'react';
import { render } from 'react-dom';
import AuthForm from './components/AuthForm/index.jsx';
import SearchForm from './components/SearchForm/index.jsx';
import styles from './index.module.css';

const Home = () => {
  return (
    <div className={styles.home}>
      <h1>Subscription Search</h1>

      <AuthForm />

      <SearchForm />
    </div>
  );
};

render(<Home />, document.getElementById('root'));
