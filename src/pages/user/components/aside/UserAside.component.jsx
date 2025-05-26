import { classNames } from '../../../../utils';
import { UserMenu } from './menu/UserMenu.component';
import { UserProfile } from './profile/UserProfile.component';
import './userAside.style.scss';

export const UserAside = ({ className }) => {
  return (
    <aside className={classNames(className, 'user-page__aside-container')}>
      <UserProfile />
      <UserMenu />
    </aside>
  );
};
