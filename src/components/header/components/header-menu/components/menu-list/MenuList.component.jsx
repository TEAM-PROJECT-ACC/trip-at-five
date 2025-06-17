import { useNavigate } from 'react-router-dom';
import { logout } from '../../../../../../services/login/loginService';
import { classNames } from '../../../../../../utils';
import { Button } from '../../../../../buttons';
import { LinkButton } from '../../../../../buttons/link-button/LinkButton.component';
import { successAlert } from '../../../../../../utils/toastUtils/toastUtils';
import {
	loginAccountStore,
	loginStateStore,
} from '../../../../../../states/login/loginStore';
import './menuList.style.scss';

export const MenuList = ({ isShow, onClick }) => {
	const { loginInfo } = loginStateStore();
	// TODO: loginInfo 상태 수정 변경 확인 후 수정
	const isLogin = sessionStorage.getItem('Logged');

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
			{isLogin && (
				<LinkButton
					to='/guest/reservations'
					className='global-header__menu-link-btn'
					onClick={onClick}
				>
					비회원 예약 조회
				</LinkButton>
			)}
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
};
