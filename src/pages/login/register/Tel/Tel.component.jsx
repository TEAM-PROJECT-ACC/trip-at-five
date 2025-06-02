import './tel.component.scss';
import {
	ButtonPrimary,
	ButtonSecondary,
	InputPrimary,
} from '../../../../components';
import { RegisterInfostore, useRegisterStore } from '../RegisterStore';
import { useState } from 'react';
import { validatePhoneNumber } from '../../util/validate';

export default function RegisterTel() {
	const { setAddStep } = useRegisterStore();
	const { tel, setTel } = RegisterInfostore();
	const [error, setError] = useState();

	const telSkip = () => {
		setAddStep();
	};


	const validatePhoneNumberCheck = (e) => {
    const value = e.target.value;
    setTel(value);

    if (value.length === 0) {
        setError('');
    } else if (value.includes('-')) { 
        setError(" '-'를 제외하고 입력해주세요 "); 
    } else if (!validatePhoneNumber(value)) {			  
        setError('올바른 전화번호 형식이 아닙니다.');
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
