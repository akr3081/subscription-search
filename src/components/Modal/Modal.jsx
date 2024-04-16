import React from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const Modal = ({ isOpen, handleClose, children, className }) => {
  return isOpen ? (
    <div>
      <div className={`${styles.modal} ${className}`}>
        <div className={styles.body}>
          {children}
        </div>
      </div>

      <div className={styles.veil} onClick={handleClose} />
    </div>

  ) : null;
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string
};

export default Modal;