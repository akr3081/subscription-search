import React, { useState } from 'react';
import styles from './AuthForm.module.css';

const AuthForm = () => {
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = () => {
    setHasSubmitted(true);
  };

  return (
    <div className={styles.authForm}>
      {hasSubmitted ? (
        <div>Submitted</div>
      ) : (
        <div className={styles.form}>
          <span>
            <label htmlFor="api_key">API Key</label>
            <input id="api_key" />
          </span>

          <span>
            <label htmlFor="channel_id">Channel ID</label>
            <input id="channel_id" />
          </span>

          <button onClick={handleSubmit}>Save</button>
        </div>
      )}
    </div>
  );
};

export default AuthForm;
