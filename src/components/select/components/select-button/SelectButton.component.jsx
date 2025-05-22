import { MdOutlineArrowDropDown } from '../../../../assets/icons/index';
import { classNames } from '../../../../utils';
import './selectButton.style.scss';

export const SelectButton = ({ children, isOpenDropdown, onClick }) => {
	return (
		<button
			className={classNames(
				'global-select__selected-button',
				isOpenDropdown ? 'open' : ''
			)}
			onClick={onClick}>
			{children}
			<MdOutlineArrowDropDown className='global-select__button-icon' />
		</button>
	);
};
