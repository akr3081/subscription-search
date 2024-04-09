import React from 'react';
import PropTypes from 'prop-types';
import useStore from '../../stores/useStore.js';
import styles from './AuthForm.module.css';

const AuthForm = ({ handleSubmit, className }) => {
  const { apiKey, channelId } = useStore();

  return (
    <form className={`${styles.authForm} ${className}`} onSubmit={handleSubmit}>
      <span>
        <label htmlFor="apiKey">API Key</label>
        <input id="apiKey" name="apiKey" defaultValue={apiKey} required />
      </span>

      <span>
        <label htmlFor="channelId">Channel ID</label>
        <input id="channelId" name="channelId" defaultValue={channelId} required />
      </span>

      <button type="submit">Save</button>
    </form>
  );
};

AuthForm.propTypes = {
  handleSubmitSearch: PropTypes.func,
  className: PropTypes.string
};

export default AuthForm;
