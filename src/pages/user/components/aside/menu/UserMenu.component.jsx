import { USER_ROUTE } from '../../../constants/routes-path/userRoute.constant';
import { UserMenuButton } from './components/button/UserButton.component';
import { classNames } from '../../../../../utils';
import './userMenu.style.scss';

const CLASSNAME = 'aside-menu';

export const UserMenu = ({ className }) => {
  return (
    <div className={classNames(className, `${CLASSNAME}__container`)}>
      <ul className={`${CLASSNAME}__list`}>
        {USER_ROUTE.map((route, idx) => {
          return (
            !route.index && (
              <UserMenuButton
                key={idx}
                className={CLASSNAME}
                to={route.path}
              >
                {route.title}
              </UserMenuButton>
            )
          );
        })}
        <UserMenuButton className={CLASSNAME}>나의 일지</UserMenuButton>
        <UserMenuButton classNAme={CLASSNAME}>문의하기</UserMenuButton>
      </ul>
    </div>
  );
};
