import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const Modal = ({ isOpen, handleClose, children, className }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const wrapModalFocus = e => {
        const modalElement = modalRef.current;
        const focusableElements = modalElement?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.code === 'Tab' && e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (e.code === 'Tab' && !e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      };

      const closeModal = e => {
        if (e.code === 'Escape') handleClose();
      };

      window.addEventListener('keydown', wrapModalFocus);
      window.addEventListener('keydown', closeModal);

      return () => {
        window.removeEventListener('keydown', wrapModalFocus);
        window.removeEventListener('keydown', closeModal);
      };
    }
  }, [isOpen]);

  return isOpen ? (
    <div>
      <div className={`${styles.modal} ${className}`} role="dialog" aria-modal="true" ref={modalRef}>
        {children}
      </div>

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
