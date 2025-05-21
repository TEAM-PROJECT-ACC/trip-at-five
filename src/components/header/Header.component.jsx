import { classNames } from '../../utils';
import { LoginButton, LogoButton } from './components';
import { ButtonsContainer } from './components/buttons-container/ButtonsContainer.component';
import './header.style.scss';

export const AppHeader = ({ className }) => {
	return (
		<header className={classNames('global-header__container', className)}>
			<div className='global-header__inner'>
				{/* 로고 */}
				{/* NOTI: 확인 용 영문 로고 */}
				{/* <MainLogoEn className={'header__logo'} /> */}
				<LogoButton />
				<ButtonsContainer />
			</div>
		</header>
	);
};
