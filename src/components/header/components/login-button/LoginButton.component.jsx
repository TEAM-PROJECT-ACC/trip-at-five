import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from '../../../../assets/icons/index';
import { classNames } from '../../../../utils';
import './loginButton.style.scss';

export const LoginButton = ({ className }) => {
  const isLogin = sessionStorage.getItem('Logined');
  const [isHover, setIsHover] = useState(() => false);

  const handleMouseOver = () => {
    setIsHover(() => true);
  };

  const handleMouseOut = () => {
    setIsHover(() => false);
  };

  return (
    <Link
      className={classNames(
        'global-header__login-button',
        !isLogin && isHover ? 'hover' : '',
        className
      )}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      to={!isLogin ? '/login' : '/users'}
    >
      <span
        className={classNames(
          'global-header__login-button-inner',
          isHover ? 'hover' : ''
        )}
      >
        {!isLogin && isHover ? (
          '로그인/회원가입'
        ) : (
          <FaUser className='login-button__icon' />
        )}
      </span>
    </Link>
  );
};
