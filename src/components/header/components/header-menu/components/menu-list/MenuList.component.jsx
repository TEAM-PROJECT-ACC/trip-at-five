import { useEffect } from 'react';
import { logout } from '../../../../../../services/login/loginService';
import { loginAccountStore } from '../../../../../../states/login/loginStore';
import { classNames } from '../../../../../../utils';
import { successAlert } from '../../../../../../utils/toastUtils/toastUtils';
import { LinkButton } from '../../../../../buttons/link-button/LinkButton.component';
import './menuList.style.scss';

export const MenuList = ({ isShow }) => {
	const { isLogin, resetLoginAccountStore } = loginAccountStore();

	const logoutHandler = async () => {
		const result = await logout();
		successAlert('로그아웃 했습니다.');
		resetLoginAccountStore();
		localStorage.clear();
		sessionStorage.clear();
	};

	useEffect(() => {
		
	}, [isLogin]);

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
			<LinkButton
				to='/guest/reservations'
				className='global-header__menu-link-btn'
			>
				비회원 예약 조회
			</LinkButton>
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
};
