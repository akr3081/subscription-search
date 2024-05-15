import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon.jsx';
import Loader from '../Loader/Loader.jsx';
import styles from './IconButton.module.css';

const IconButton = ({ iconName, isLoading, className, ...buttonProps }) => {
  const IconComponent = Icon[iconName];

  return (
    <button className={`${styles.iconButton} ${className}`} data-testid={`icon_button_${iconName}`} {...buttonProps}>
      {isLoading ? <Loader /> : <IconComponent />}
    </button>
  );
};

IconButton.propTypes = {
  iconName: PropTypes.string,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  buttonProps: PropTypes.bool
};

IconButton.defaultProps = {
  iconName: 'info'
};

export default IconButton;
