import { classNames } from '../../../../utils';
import { HeaderMenu } from '../header-menu/HeaderMenu.component';
import { LoginButton } from '../login-button/LoginButton.component';

import './buttonsContainer.style.scss';
import { loginAccountStore } from '../../../../states/login/loginStore';

export const ButtonsContainer = ({ className }) => {
  const {isLogin} = loginAccountStore();

  return (
    <div className={classNames('global-header__btn-container', className)}>
      {/* 로그인/회원가입 버튼 */}
<<<<<<< HEAD
      {!isLogin ?
       <LoginButton /> :''
      }
=======
      <LoginButton />
>>>>>>> 07cf94db961fa04a464e47cdb58b685cbadf9eb8
      {/* 햄버거 버튼 */}
      <HeaderMenu />
    </div>
  );
};
