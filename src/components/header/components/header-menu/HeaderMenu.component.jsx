import { useEffect, useRef, useState } from 'react';
import { MenuButton } from './components/menu-button/MenuButton.component';
import { MenuList } from './components/menu-list/MenuList.component';
import './headerMenu.style.scss';

export const HeaderMenu = () => {
  const [isShow, setIsShow] = useState(() => false);
  const menuRef = useRef();

  const handleClickMenu = () => {
    setIsShow(() => false);
  };

  const handleClickButton = () => {
    setIsShow((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsShow(() => false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isShow]);

  return (
    <div
      className='global-header__menu'
      ref={menuRef}
    >
      <MenuButton onClick={handleClickButton} />
      <MenuList
        isShow={isShow}
        onClick={handleClickMenu}
      />
    </div>
  );
};
