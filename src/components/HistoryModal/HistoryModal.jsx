import React from 'react';
import PropTypes from 'prop-types';
import { CLOSE_CTA, HISTORY_MODAL_HEADING } from '../../common/constants.js';
import IconButton from '../IconButton/IconButton.jsx';
import Modal from '../Modal/Modal.jsx';
import useStore from '../../stores/useStore.js';
import styles from './HistoryModal.module.css';

const HistoryModal = ({ isOpen, handleClose, handleSubmitSearch, className }) => {
  const { history, subscriptions, setHistory, setSearchTerm } = useStore();

  const applyHistoryItem = item => {
    // Filter out any selected subscriptions which are not found in current subscription list
    const selectedSubs = item.selectedSubscriptions
      .map(selectedSub => subscriptions.find(sub => sub.id === selectedSub)?.id)
      .filter(subId => !!subId);

    setSearchTerm(item.searchTerm);
    handleSubmitSearch({ searchTerm: item.searchTerm, selectedSubscriptions: selectedSubs });
    handleClose();
  };

  const removeItemFromHistory = timestamp => {
    const updatedHistory = history.filter(item => item.timestamp !== timestamp);
    setHistory(updatedHistory);
  };

  const formatSelectedSubs = item => {
    const subs = item.selectedSubscriptions
      .map(selectedSub => subscriptions.find(sub => sub.id === selectedSub))
      .filter(sub => sub?.snippet);

    return subs.map(sub => (
      <span className={styles.subTag} key={`selected_sub_${sub.id}`}>
        <img src={sub.snippet.thumbnails.medium.url} alt={sub.snippet.title} referrerPolicy="no-referrer" />
        <p>{`${sub.snippet.title}`}</p>
      </span>
    ));
  };

  return (
    <Modal isOpen={isOpen} handleClose={handleClose} className={`${styles.modal} ${className}`}>
      <h1 className={styles.heading}>{HISTORY_MODAL_HEADING}</h1>
      <div className={`${styles.body} ${className}`}>
        {history.map(item => (
          <div className={styles.item} key={`history_item_${item.timestamp}`}>
            <div
              className={styles.itemContent}
              onClick={() => {
                applyHistoryItem(item);
              }}
            >
              <p className={styles.searchTerm}>{item.searchTerm}</p>
              <div className={styles.selectedSubs}>{formatSelectedSubs(item)}</div>
            </div>
            <div className={styles.itemButtons}>
              <IconButton
                iconName="remove"
                onClick={() => {
                  removeItemFromHistory(item.timestamp);
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <button className={styles.closeButton} onClick={handleClose}>
        {CLOSE_CTA}
      </button>
    </Modal>
  );
};

HistoryModal.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string
};

export default HistoryModal;
