import React, { useState } from 'react';
import { render } from 'react-dom';
import AuthHeader from './components/AuthHeader/index.jsx';
import SearchForm from './components/SearchForm/index.jsx';
import styles from './index.module.css';

const Home = () => {
  const [userData, setUserData] = useState({ apiKey: '', channelId: '' });

  const handleSubmitAuth = ({ apiKey, channelId }) => {
    setUserData({ apiKey, channelId });
  };

  return (
    <div className={styles.home}>
      <h1>Subscription Search</h1>

      <AuthHeader userData={userData} handleSubmitAuth={handleSubmitAuth} />

      {userData.apiKey && <SearchForm />}
    </div>
  );
};

render(<Home />, document.getElementById('root'));
