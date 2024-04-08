import React from 'react';
import PropTypes from 'prop-types';
import styles from './AuthForm.module.css';

const AuthForm = ({ userData, handleSubmit, className }) => {
  return (
    <form className={`${styles.authForm} ${className}`} onSubmit={handleSubmit}>
      <span>
        <label htmlFor="apiKey">API Key</label>
        <input id="apiKey" name="apiKey" defaultValue={userData.apiKey} required />
      </span>

      <span>
        <label htmlFor="channelId">Channel ID</label>
        <input id="channelId" name="channelId" defaultValue={userData.channelId} required />
      </span>

      <button type="submit">Save</button>
    </form>
  );
};

AuthForm.propTypes = {
  userData: PropTypes.object,
  handleSubmitSearch: PropTypes.func,
  className: PropTypes.string
};

export default AuthForm;
