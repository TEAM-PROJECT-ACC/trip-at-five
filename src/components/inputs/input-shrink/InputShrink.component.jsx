import { useEffect, useRef, useState } from 'react';
import { classNames } from '../../../utils';
import { Input } from '../index';
import './inputShrink.style.scss';

export const InputShrink = ({
	className,
	defaultValue,
	onChange,
	type,
	labelText,
	...props
}) => {
	const [isFocus, setIsFocus] = useState(() => false);
	const focusRef = useRef();

	const handleFocus = () => {
		setIsFocus((prev) => !prev);
	};

	useEffect(() => {
		const handleClickOut = (event) => {
			if (focusRef.current && !focusRef.current.contains(event.target)) {
				setIsFocus(() => false);
			}
		};

		document.addEventListener('mousedown', handleClickOut);

		return () => {
			document.removeEventListener('mousedown', handleClickOut);
		};
	}, []);

	return (
		<span
			ref={focusRef}
			className={classNames(
				'global-input__shrink-container',
				className,
				isFocus ? 'focus' : ''
			)}>
			<label
				for='global-input__shrink'
				className={classNames('global-input__shrink-label', className)}>
				{labelText}
			</label>
			<Input
				id='global-input__shrink'
				className={classNames('global-input__shrink', className)}
				defaultValue={defaultValue}
				onChange={onChange}
				onFocus={handleFocus}
				placeholder={' '}
				type={type}
				{...props}
			/>
		</span>
	);
};
