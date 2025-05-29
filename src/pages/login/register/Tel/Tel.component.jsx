import './tel.component.scss';
import {
	ButtonPrimary,
	ButtonSecondary,
	InputPrimary,
} from '../../../../components';
import { RegisterInfostore, useRegisterStore } from '../RegisterStore';
import { useState } from 'react';

export default function RegisterTel() {
	const { setAddStep } = useRegisterStore();
	const { tel, setTel } = RegisterInfostore();
	const [error, setError] = useState();

	const telSkip = () => {
		setAddStep();
	};

	const validatePhoneNumber = (tel) => {
		return /^01[0-9]-\d{3,4}-\d{4}$/.test(tel);
	};

	const validatePhoneNumberCheck = (e) => {
		const value = e.target.value;
		setTel(value);
		if (!validatePhoneNumber(value)) {
			setError(" '-'를 제외하고 입력해주세요 ");
		} else {
			setError('');
		}
	};

	const telOk = () => {
		tel != null ? setAddStep() : console.log('t');
	};

	return (
		<div className='register-tel-wrap'>
			<div className='register-tel-input-wrap'>
				<p className='register-tel-text'>전화번호</p>
				<InputPrimary
					className={'register-tel-input'}
					placeholder={'연락처를 입력해주세요'}
					onChange={validatePhoneNumberCheck}
				/>
				{error && <p className='validatePhone-step4-text'>{error}</p>}
			</div>

			<div className='register-tel-btn'>
				<ButtonSecondary
					className={'tel-btn-later'}
					onClick={telSkip}
				>
					나중에 입력
				</ButtonSecondary>
				<ButtonPrimary
					className={'tel-btn-check'}
					onClick={telOk}
				>
					확인
				</ButtonPrimary>
			</div>
		</div>
	);
}
