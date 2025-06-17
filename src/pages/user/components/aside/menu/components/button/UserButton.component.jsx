import { LinkButton } from '../../../../../../../components/index';
import { classNames } from '../../../../../../../utils';
import { MdArrowForwardIos } from '../../../../../../../assets/icons/index';
import { useMatch } from 'react-router-dom';
import { useMemo } from 'react';
import './userButton.style.scss';

export const UserMenuButton = ({ children, className, to }) => {
  const match = useMatch('/users/:subPath');

  const isActive = useMemo(() => {
    const subPath = match?.params.subPath;
    if (!to || !subPath) {
      return false;
    }
    return subPath === to;
  }, [match?.params.subPath, to]);

  return (
    <li
      className={classNames(
        className,
        `btn-container`,
        isActive ? 'active' : ''
      )}
    >
      <LinkButton
        className={'user-page__menu-btn'}
        to={to}
      >
        {children}
        <MdArrowForwardIos className={'user-page__menu-btn-icon'} />
      </LinkButton>
    </li>
  );
};
