import { useEffect, useRef, useState } from 'react';
import { SelectButton } from './components/select-button/SelectButton.component';
import { DropDown } from './components/drop-down/Dropdown.component';
import { classNames } from '../../utils';
import './select.style.scss';

export const Select = ({ className, defaultOption, optionList, onSelect }) => {
	const [isOpenDropDown, setIsOpenDropDown] = useState(() => false);
	const [selectedOption, setSelectedOption] = useState(
		() => defaultOption || { label: '옵션을 선택해주세요', value: 0 }
	);

	const dropdownRef = useRef();

	const handleClickSelect = () => {
		setIsOpenDropDown((prev) => !prev);
	};

	const handleClickOption = (option) => {
		setSelectedOption((prev) => option || prev);
		if (onSelect) {
			onSelect(option);
		}
		setIsOpenDropDown(() => false);
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpenDropDown(() => false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<span
			className={classNames('global-select__container', className)}
			ref={dropdownRef}>
			<SelectButton
				isOpenDropdown={isOpenDropDown}
				onClick={handleClickSelect}>
				{selectedOption.label}
			</SelectButton>
			<DropDown
				isOpen={isOpenDropDown}
				optionList={optionList}
				selectedOption={selectedOption}
				onClick={handleClickOption}
			/>
		</span>
	);
};
