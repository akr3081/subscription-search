import React from 'react';
import PropTypes from 'prop-types';
import { DarkModeIcon, LightModeIcon } from '../Icon/Icon.jsx';
import useStore from '../../stores/useStore.js';
import styles from './ThemeToggle.module.css';

const ThemeToggle = ({ className }) => {
  const { theme, setTheme } = useStore();
  const isDarkModeEnabled = Boolean(theme === 'dark');

  const toggleSwitch = () => {
    setTheme(isDarkModeEnabled ? 'light' : 'dark');
  };

  return (
    <div
      className={`${styles.toggle} ${isDarkModeEnabled ? styles.checked : ''} ${className}`}
      onClick={toggleSwitch}
      onKeyDown={e => {
        if (e.code === 'Space' || e.code === 'Enter') toggleSwitch();
      }}
      tabIndex="0"
    >
      <input type="checkbox" checked={isDarkModeEnabled} className={styles.checkbox} aria-hidden="true" readOnly />
      <span className={styles.slider} />
      {isDarkModeEnabled ? <DarkModeIcon className={styles.icon} /> : <LightModeIcon className={styles.icon} />}
    </div>
  );
};

ThemeToggle.propTypes = {
  className: PropTypes.string
};

export default ThemeToggle;
