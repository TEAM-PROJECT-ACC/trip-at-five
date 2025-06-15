import { InputPrimary } from '../../../components';
import { ResettingTitle } from '../resetting-title/PwdResettingTitle.component';

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
			<ResettingTitle
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
