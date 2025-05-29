import { ButtonPrimary, InputPrimary } from '../../../../components';
import { useRegisterStore, RegisterInfostore } from '../RegisterStore';
import './email.component.scss';
import { validateEmail } from '../../util/validateEmail';
import { useState } from 'react';

export default function RegisterEmail() {
	const { isTrue, setIsTrue, step, setAddStep } = useRegisterStore();
	const { email, emailCode, setEmail, setEmailCode } = RegisterInfostore();
	const [error, setError] = useState();

	/*이메일인증 코드 전송 및 인증코드 입력칸 표시*/
	const sendEmailCode = () => {
		{
			email != null ? setIsTrue() : '';
		}
	};

	/*이메일 형식 체크 */
	validateEmail(email);

	const validateEmailCheck = (e) => {
		const value = e.target.value;
		setEmail(value);
		if (!validateEmail(value)) {
			setError('올바른 이메일 형식이 아닙니다.');
		} else {
			setError('');
		}
	};

	/* 인증코드 체크 부분*/
	const emailCodeCheck = () => {
		console.log(email === emailCode ? 'ok' : 'fail');
		step === 1 ? setAddStep() : '';
	};

	/* step상태에 따라  sendEmailCode, emailCodeCheck 선택 실행*/
	const emailEvent = () => {
		step === 1 && isTrue === false ? sendEmailCode() : emailCodeCheck();
	};

	return (
		<div className='register-email-wrap'>
			<div className='register-email-input-wrap'>
			<p className='register-email-text'>이메일 *</p>
			<InputPrimary
				className={'register-email-input'}
				placeholder={'이메일을 입력해주세요'}
				onChange={validateEmailCheck}
			/>
			{error && <p className='validateEmail-step1-text'>{error}</p>}
			</div>

			{isTrue && (
				<div>
					<p className='register-email-text'>인증 코드</p>
					<InputPrimary
						className={'register-email-code-input'}
						placeholder={'인증코드를 입력해주세요'}
						onChange={(e) => {
							setEmailCode(e.target.value);
						}}
					/>
				</div>
			)}

			<ButtonPrimary
				className={'send-email-btn'}
				onClick={emailEvent}
			>
				이메일 인증
			</ButtonPrimary>
		</div>
	);
}
