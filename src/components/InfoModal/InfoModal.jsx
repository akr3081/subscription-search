import React from 'react';
import PropTypes from 'prop-types';
import { CLOSE_CTA, USAGE_STEPS } from '../../common/constants.js';
import Modal from '../Modal/Modal.jsx';
import styles from './InfoModal.module.css';

const InfoModal = ({ isOpen, handleClose, className }) => {
  return (
    <Modal isOpen={isOpen} handleClose={handleClose} className={`${styles.modal} ${className}`}>
      <div className={`${styles.body} ${className}`}>
        <ol className={styles.steps}>
          {USAGE_STEPS.map(step => (
            <li>
              <div className={styles.step}>
                <div dangerouslySetInnerHTML={{ __html: step.text }} />
                {step?.image ? (<img src={step.image.url} alt={step.image.altText} referrerPolicy="no-referrer" />) : null}

              </div>
            </li>
          ))
          }
        </ol >

      </div >
      <button className={styles.submitButton} onClick={handleClose}>{CLOSE_CTA}</button>
    </Modal >
  );
};

InfoModal.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string
};

export default InfoModal;