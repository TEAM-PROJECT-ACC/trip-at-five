import { classNames } from '../../../utils';
import { Input } from '../index';
import './inputPrimary.style.scss';

export const InputPrimary = ({
	className,
	defaultValue,
	placeholder,
	onChange,
	type,
	...props
}) => {
	return (
		<Input
			className={classNames('global-input__primary', className)}
			defaultValue={defaultValue}
			onChange={onChange}
			placeholder={placeholder}
			type={type}
			{...props}
		/>
	);
};
