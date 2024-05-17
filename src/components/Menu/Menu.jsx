import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon.jsx';
import IconButton from '../IconButton/IconButton.jsx';
import styles from './Menu.module.css';

const Menu = ({ items, isUserAuthenticated, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Close menu on escape key
  useEffect(() => {
    const closeMenu = e => {
      if (e.code === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', closeMenu);
    return () => window.removeEventListener('keydown', closeMenu);
  }, []);

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
            {items
              .filter(item => !item.isAuthRequired || (item.isAuthRequired && isUserAuthenticated))
              .map(item => {
                const IconComponent = Icon[item.iconName];
                return (
                  <button
                    className={`${styles.item} ${item.className}`}
                    onClick={() => {
                      handleClick(item);
                    }}
                    tabIndex="0"
                  >
                    <IconComponent />
                    <p>{item.label}</p>
                  </button>
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
  items: PropTypes.array,
  isUserAuthenticated: PropTypes.bool,
  className: PropTypes.string
};

export default Menu;
