import { ButtonPrimary, InputPrimary } from '../../../../components';
import { useRegisterStore, RegisterInfostore } from '../RegisterStore';
import './email.component.scss';
import { validateEmail } from '../../util/validateEmail';
import { useEffect, useState } from 'react';
import { emailDuplicationCheck } from '../../../../services/register/apiService';

export default function RegisterEmail() {
	const { step, setAddStep } = useRegisterStore();
	const { isTrue, setIsTrue, setIsFalse } = useRegisterStore();
	const { type, setTypeTrue, setTypeFalse } = useRegisterStore();
	const { email, emailCode, setEmail, setEmailCode } = RegisterInfostore();
	const [error, setError] = useState();

	const validateEmailCheck = (e) => {
		const value = e.target.value;
		setEmail(value);

		if (value.length === 0) {
			setError('');
		} else if (!validateEmail(value)) {
			setError('올바른 이메일 형식이 아닙니다.');
		} else {
			setError('');
		}
	};

	/* 이메일 인증 중복 체크 */
	const emailCheck = async () => {
		if (!validateEmail(email) || email.length === 0) {
			return;
		}
		const response = await emailDuplicationCheck(email);

		if (response == 1) {
			setError('이메일이 중복됩니다.');
			setIsFalse();
		} else {
			/*인증코드 보내기*/
			setIsTrue();
		}
	};

	/* 이메일인증 코드 검사 및 확인후 넘기기 */
	const sendEmailCode = () => {
		{
			console.log('sendEmailCode 부분');
			email != null ? setIsTrue() : '';
		}
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
				onClick={isTrue == true ? sendEmailCode : emailCheck}
			>
				이메일 인증
			</ButtonPrimary>
		</div>
	);
}
