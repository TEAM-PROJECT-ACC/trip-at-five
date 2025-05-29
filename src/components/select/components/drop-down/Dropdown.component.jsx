import { classNames } from '../../../../utils';
import { Option } from './components/option/Option.component';
import './dropdown.style.scss';

export const DropDown = ({ isOpen, optionList, selectedOption, onClick }) => {
	return (
		<div
			className={classNames(
				'global-select__dropdown-container',
				isOpen ? 'open' : ''
			)}>
			<ul className={classNames('global-select__dropdown')}>
				{optionList &&
					optionList.length > 0 &&
					optionList.map((option, idx) => {
						const isSelected = selectedOption.value === option.value;
						return (
							<Option
								key={idx}
								isSelected={isSelected}
								onClick={onClick}
								option={option}>
								{option.label}
							</Option>
						);
					})}
			</ul>
		</div>
	);
};
