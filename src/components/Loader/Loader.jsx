import React from 'react';
import PropTypes from 'prop-types';
import styles from './Loader.module.css';

const Loader = ({ className }) => <span className={`${styles.loader} ${className}`} />;

Loader.propTypes = {
  className: PropTypes.string
};

export default Loader;
