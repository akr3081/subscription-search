import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon.jsx';
import IconButton from '../IconButton/IconButton.jsx';
import styles from './Menu.module.css';

const Menu = ({ items, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = item => {
    setIsOpen(false);
    item.onClick();
  };

  return (
    <>
      <div className={`${styles.menu} ${className}`}>
        <IconButton
          iconName="moreVertical"
          className={styles.icon}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
        {isOpen ? (
          <div className={styles.items}>
            {items.map(item => {
              const IconComponent = Icon[item.iconName];
              return (
                <div
                  className={styles.item}
                  onClick={() => {
                    handleClick(item);
                  }}
                >
                  <IconComponent />
                  <p>{item.label}</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>

      {isOpen ? (
        <div
          className={styles.veil}
          onClick={() => {
            setIsOpen(false);
          }}
        />
      ) : null}
    </>
  );
};
Menu.propTypes = {
  className: PropTypes.string
};

export default Menu;
