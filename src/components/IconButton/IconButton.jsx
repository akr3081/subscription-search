import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon.jsx'
import styles from './IconButton.module.css';

const IconButton = ({ iconName, className, ...buttonProps }) => {
  const IconComponent = Icon[iconName];

  return (
    <button className={`${styles.iconButton} ${className}`} {...buttonProps}>
      <IconComponent />
    </button>
  );
}

IconButton.propTypes = {
  iconName: PropTypes.string,
  className: PropTypes.string,
  buttonProps: PropTypes.bool
};

IconButton.defaultProps = {
  iconName: 'info'
};

export default IconButton;