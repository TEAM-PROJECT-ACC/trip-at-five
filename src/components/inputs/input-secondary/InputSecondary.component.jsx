import { classNames } from '../../../utils';
import { Input } from '../index';
import './inputSecondary.style.scss';

export const InputSecondary = ({
	className,
	defaultValue,
	placeholder,
	onChange,
	type,
	...props
}) => {
	return (
		<Input
			className={classNames('global-input__secondary', className)}
			defaultValue={defaultValue}
			onChange={onChange}
			placeholder={placeholder}
			type={type}
			{...props}
		/>
	);
};
