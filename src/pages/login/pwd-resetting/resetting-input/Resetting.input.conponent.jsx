import { InputPrimary } from '../../../../components';
import { ResttingTitle } from '../resetting-title/Resetting.title.conponent';

export function ResettingInput({
	TclassName,
	IclassName,
	text,
	placeholder,
	onChange,
	type,
}) {
	return (
		<>
			<ResttingTitle
				className={TclassName}
				text={text}
			/>
			<InputPrimary
				className={IclassName}
				type={type}
				placeholder={placeholder}
				onChange={onChange}
			/>
		</>
	);
}
