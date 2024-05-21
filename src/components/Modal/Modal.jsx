import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const Modal = ({ isOpen, handleClose, children, className }) => {
  useEffect(() => {
    const closeModal = e => {
      if (e.code === 'Escape') handleClose();
    };

    window.addEventListener('keydown', closeModal);
    return () => window.removeEventListener('keydown', closeModal);
  }, []);

  return isOpen ? (
    <div>
      <div className={`${styles.modal} ${className}`}>{children}</div>

      <div className={styles.veil} data-testid="modal_veil" onClick={handleClose} />
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
