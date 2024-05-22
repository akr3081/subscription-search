import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useStore from '../../stores/useStore.js';
import AuthModal from '../AuthModal/AuthModal.jsx';
import InfoModal from '../InfoModal/InfoModal.jsx';
import HistoryModal from '../HistoryModal/HistoryModal.jsx';
import Menu from '../Menu/Menu.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import { YouTubeIcon } from '../Icon/Icon.jsx';
import styles from './AppHeader.module.css';

/**
 * App header with authentication form
 * @param {function} handleSubmitAuth - Handle auth form submit
 * @param {string} className - CSS class name
 */
const AppHeader = ({ handleSubmitAuth, handleSubmitSearch, isSearchEnabled, isLoadingSearch, className }) => {
  const { userData, reset } = useStore();

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  const handleAuthFormSubmit = async e => {
    e.preventDefault();
    const formDataObj = {};

    const formData = new FormData(e.currentTarget);
    formData.forEach((value, key) => (formDataObj[key] = value));

    const isAuthenticated = await handleSubmitAuth(formDataObj);
    if (isAuthenticated) setIsAuthModalOpen(false);
  };

  return (
    <>
      <div className={`${styles.header} ${className}`}>
        <YouTubeIcon className={styles.headerIcon} />

        {userData?.isUserAuthenticated ? (
          <SearchBar handleSubmit={handleSubmitSearch} isSearchEnabled={isSearchEnabled} isLoading={isLoadingSearch} />
        ) : null}

        <Menu
          items={[
            {
              iconName: 'history',
              label: 'History',
              isHidden: !userData?.isUserAuthenticated,
              onClick: () => {
                setIsHistoryModalOpen(true);
              }
            },
            {
              iconName: 'info',
              label: 'Help',
              onClick: () => {
                setIsInfoModalOpen(true);
              }
            },
            {
              iconName: 'login',
              label: 'Sign In',
              className: styles.signIn,
              isHidden: userData?.isUserAuthenticated,
              onClick: () => {
                setIsAuthModalOpen(true);
              }
            },
            {
              iconName: 'logout',
              label: 'Sign Out',
              isHidden: !userData?.isUserAuthenticated,
              className: styles.signOut,
              onClick: () => {
                reset();
                window.location.reload();
              }
            }
          ]}
          isUserAuthenticated={userData?.isUserAuthenticated}
          showThemeToggle
        />
      </div>

      <div id="modals">
        <InfoModal
          isOpen={isInfoModalOpen}
          handleClose={() => {
            setIsInfoModalOpen(false);
          }}
          className={styles.form}
        />

        <AuthModal
          isOpen={isAuthModalOpen}
          handleClose={() => {
            setIsAuthModalOpen(false);
          }}
          handleSubmit={handleAuthFormSubmit}
          className={styles.form}
        />

        <HistoryModal
          isOpen={isHistoryModalOpen}
          handleClose={() => {
            setIsHistoryModalOpen(false);
          }}
          handleSubmitSearch={handleSubmitSearch}
          className={styles.form}
        />
      </div>
    </>
  );
};

AppHeader.propTypes = {
  handleSubmitAuth: PropTypes.func,
  handleSubmitSearch: PropTypes.func,
  isSearchEnabled: PropTypes.bool,
  isLoadingSearch: PropTypes.bool,
  className: PropTypes.string
};

export default AppHeader;
