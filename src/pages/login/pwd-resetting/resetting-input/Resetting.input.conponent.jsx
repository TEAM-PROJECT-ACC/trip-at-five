import { InputPrimary } from '../../../../components';
import { ResttingTitle } from '../resetting-title/Resetting.title.conponent';

export function ResettingInput({
	text_className,
	input_className,
	text,
	placeholder,
	onChange,
	type,
}) {
	return (
		<>
			<ResttingTitle
				className={text_className}
				text={text}
			/>
			<InputPrimary
			  className={input_className}
				type={type}
				placeholder={placeholder}
				onChange={onChange}
			/>
		</>
	);
}
