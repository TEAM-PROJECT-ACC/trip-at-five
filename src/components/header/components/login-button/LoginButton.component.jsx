import { useState } from 'react';
import { FaUser } from '../../../../assets/icons/index';
import { Button } from '../../../buttons/button/Button.component';
import { classNames } from '../../../../utils';
import './loginButton.style.scss';

export const LoginButton = ({ className }) => {
	const [isHover, setIsHover] = useState(() => false);

	const handleMouseOver = () => {
		setIsHover(() => true);
	};

	const handleMouseOut = () => {
		setIsHover(() => false);
	};

	// TODO: 로그인/회원가입 페이지 이동 기능 구현

	return (
		<Button
			className={classNames(
				'global-header__login-button',
				isHover ? 'hover' : '',
				className
			)}
			onMouseOver={handleMouseOver}
			onMouseOut={handleMouseOut}>
			<span
				className={classNames(
					'global-header__login-button-inner',
					isHover ? 'hover' : ''
				)}>
				{isHover ? (
					'로그인/회원가입'
				) : (
					<FaUser className='login-button__icon' />
				)}
			</span>
		</Button>
	);
};
