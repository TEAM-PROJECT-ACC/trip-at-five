import { classNames } from '../../../../../../utils';
import { LinkButton } from '../../../../../buttons/linkButton/LinkButton.component';
import './menuList.style.scss';

export const MenuList = ({ isShow }) => {
	return (
		<div
			className={classNames('global-header__menu-list', isShow ? 'show' : '')}>
			<LinkButton className='global-header__menu-link-btn'>챌린지</LinkButton>
			<LinkButton className='global-header__menu-link-btn'>
				비회원 예약 조회
			</LinkButton>
			<LinkButton className='global-header__menu-link-btn'>장바구니</LinkButton>
			<LinkButton className='global-header__menu-link-btn'>문의하기</LinkButton>
			<LinkButton className='global-header__menu-link-btn'>로그인</LinkButton>
		</div>
	);
};
