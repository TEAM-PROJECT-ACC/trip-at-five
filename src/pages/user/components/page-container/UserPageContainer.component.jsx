import { classNames } from '../../../../utils';
import './userPageContainer.style.scss';

export const UserPageContainer = ({ children, className }) => {
  return (
    <div className={classNames('user-page__sub-page-container', className)}>
      {children}
    </div>
  );
};
