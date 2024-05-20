import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useStore from '../../stores/useStore.js';
import Icon, { UserIcon } from '../Icon/Icon.jsx';
import styles from './Menu.module.css';
import ThemeToggle from '../ThemeToggle/ThemeToggle.jsx';

const Menu = ({ items, isUserAuthenticated, showThemeToggle, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { userData } = useStore();

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
        <button
          className={styles.menuButton}
          data-testid="menu_button"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {isUserAuthenticated ? (
            <img src={userData?.thumbnails?.medium?.url} alt={userData?.title} referrerPolicy="no-referrer" />
          ) : (
            <UserIcon />
          )}
        </button>
        {isOpen ? (
          <div className={styles.items}>
            {showThemeToggle ? (
              <div className={styles.themeToggleContainer}>
                <ThemeToggle />
              </div>
            ) : null}

            {items
              .filter(item => !item.isHidden)
              .map(item => {
                const IconComponent = Icon[item.iconName];
                return (
                  <button
                    className={`${styles.item} ${item.className}`}
                    onClick={() => {
                      handleClick(item);
                    }}
                    data-testid={`menu_item_${item.iconName}`}
                    key={`menu_item_${item.iconName}`}
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
  showThemeToggle: PropTypes.bool,
  className: PropTypes.string
};

export default Menu;
