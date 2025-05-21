import { MainLogoEn } from '../../../../assets/icons';
import './logo.style.scss';

export const Logo = () => {
	return (
		<div className='global-footer__logo-container'>
			<MainLogoEn className={'global-footer__logo'} />
		</div>
	);
};
