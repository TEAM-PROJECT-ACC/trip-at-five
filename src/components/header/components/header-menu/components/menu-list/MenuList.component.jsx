<<<<<<< HEAD
import { useEffect } from 'react';
import { logout } from '../../../../../../services/login/loginService';
import { loginAccountStore } from '../../../../../../states/login/loginStore';
import { classNames } from '../../../../../../utils';
import { successAlert } from '../../../../../../utils/toastUtils/toastUtils';
=======
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../../../../services/login/loginService';
import { classNames } from '../../../../../../utils';
import { Button } from '../../../../../buttons';
>>>>>>> 07cf94db961fa04a464e47cdb58b685cbadf9eb8
import { LinkButton } from '../../../../../buttons/link-button/LinkButton.component';
import { successAlert } from '../../../../../../utils/toastUtils/toastUtils';
import { loginStateStore } from '../../../../../../states/login/loginStore';
import './menuList.style.scss';

<<<<<<< HEAD
export const MenuList = ({ isShow }) => {
	const { isLogin, resetLoginAccountStore } = loginAccountStore();

	const logoutHandler = async () => {
		const result = await logout();
		successAlert('로그아웃 했습니다.');
		resetLoginAccountStore();
		localStorage.clear();
		sessionStorage.clear();
	};

	useEffect(() => {}, [isLogin]);

	return (
		<div
			className={classNames('global-header__menu-list', isShow ? 'show' : '')}
		>
			<LinkButton
				className='global-header__menu-link-btn'
				to='/user/challenge'
			>
				챌린지
			</LinkButton>
			{!isLogin && (
				<LinkButton
					to='/guest/reservations'
					className='global-header__menu-link-btn'
				>
					비회원 예약 조회
				</LinkButton>
			)}
			<LinkButton
				to='/carts'
				className='global-header__menu-link-btn'
			>
				장바구니
			</LinkButton>
			<LinkButton
				className='global-header__menu-link-btn'
				to='/chat'
			>
				문의하기
			</LinkButton>

			{!isLogin ? (
				<LinkButton
					className='global-header__menu-link-btn'
					to='/login'
				>
					로그인
				</LinkButton>
			) : (
				<LinkButton
					className='global-header__menu-link-btn'
					to='/'
				>
					<p onClick={logoutHandler}>로그아웃</p>
				</LinkButton>
			)}
		</div>
	);
=======
export const MenuList = ({ isShow, onClick }) => {
  const { loginInfo } = loginStateStore();
  // TODO: loginInfo 상태 수정 변경 확인 후 수정
  const isLogin = sessionStorage.getItem('Logined');

  const navigate = useNavigate();

  const onClickLogout = async () => {
    const result = await logout();
    if (result.data === 'ok') {
      successAlert('로그아웃 했습니다.');
      navigate('/');
      onClick();
    }
  };

  return (
    <div
      className={classNames('global-header__menu-list', isShow ? 'show' : '')}
    >
      <LinkButton
        className='global-header__menu-link-btn'
        to='/users/challenge'
        onClick={onClick}
      >
        챌린지
      </LinkButton>
      <LinkButton
        to='/guest/reservations'
        className='global-header__menu-link-btn'
        onClick={onClick}
      >
        비회원 예약 조회
      </LinkButton>
      <LinkButton
        to='/carts'
        className='global-header__menu-link-btn'
        onClick={onClick}
      >
        장바구니
      </LinkButton>
      <LinkButton
        className='global-header__menu-link-btn'
        to='/chat'
        onClick={onClick}
      >
        문의하기
      </LinkButton>
      {!isLogin ? (
        <LinkButton
          className='global-header__menu-link-btn'
          to='/login'
          onClick={onClick}
        >
          로그인
        </LinkButton>
      ) : (
        <Button
          className={classNames(
            'global-link__button',
            'global-header__menu-link-btn',
            'logout'
          )}
          onClick={onClickLogout}
        >
          로그아웃
        </Button>
      )}
    </div>
  );
>>>>>>> 07cf94db961fa04a464e47cdb58b685cbadf9eb8
};
