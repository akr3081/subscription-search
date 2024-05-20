import React from 'react';
import PropTypes from 'prop-types';
import { LOGIN_BANNER_CONTENT } from '../../common/constants.js';
import styles from './LoginBanner.module.css';

const LoginBanner = ({ className }) => (
  <div className={`${styles.banner} ${className}`}>
    <h1 className={styles.heading}>{LOGIN_BANNER_CONTENT.HEADING}</h1>
    <h2 className={styles.subHeading}>{LOGIN_BANNER_CONTENT.SUBHEADING}</h2>
  </div>
);

LoginBanner.propTypes = {
  className: PropTypes.string
};

export default LoginBanner;
