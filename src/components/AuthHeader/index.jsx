import React, { useEffect, useState } from 'react';
import styles from './AuthHeader.module.css';

const AuthHeader = ({ userData, handleSubmitAuth, className }) => {
  const [isFormOpen, setIsFormOpen] = useState(!userData.apiKey);

  // Sets form open if apiKey is empty
  useEffect(() => {
    setIsFormOpen(!userData.apiKey);
  }, [userData]);

  // Clears userData after form is opened
  useEffect(() => {
    if (isFormOpen) {
      handleSubmitAuth({ apiKey: '', channelId: '' });
    }
  }, [isFormOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataObj = {};

    const formData = new FormData(e.currentTarget);
    formData.forEach((value, key) => (formDataObj[key] = value));

    handleSubmitAuth(formDataObj);
  };

  return (
    <div className={`${styles.authHeader} ${className}`}>
      {isFormOpen ? (
        <form className={styles.form} onSubmit={handleSubmit}>
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
      ) : (
        <div>
          <button onClick={() => setIsFormOpen(true)}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default AuthHeader;