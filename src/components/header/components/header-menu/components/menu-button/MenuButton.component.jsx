import { FaBars } from '../../../../../../assets/icons';
import { Button } from '../../../../../buttons/button/Button.component';
import './menuButton.style.scss';

export const MenuButton = ({ onClick }) => {
	return (
		<Button
			className='global-header__menu-button'
			onClick={onClick}>
			<FaBars className='global-header__menu-button__icon' />
		</Button>
	);
};
