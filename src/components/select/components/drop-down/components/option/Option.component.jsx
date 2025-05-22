import { classNames } from '../../../../../../utils/index';
import './option.style.scss';

export const Option = ({
	children,
	isSelected,
	className,
	option,
	onClick,
}) => {
	const handleClick = () => {
		if (onClick) {
			onClick(option);
		}
	};

	return (
		<li
			className={classNames(
				'global-drop-down__option',
				className,
				isSelected ? 'selected' : ''
			)}
			onClick={handleClick}>
			{children}
		</li>
	);
};
