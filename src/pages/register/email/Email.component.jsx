import './email.style.scss';
import { ButtonPrimary, InputPrimary } from '../../../components';
import {
	useRegisterStore,
	useRegisterInfostore,
} from '../../../states/register/registerStore';
import { validateEmail } from '../util/validate';
import { useState } from 'react';
import {
	emailCodeCheck,
	emailDuplicationCheck,
	sendEmailCode,
} from '../../../services/register/apiService';

export default function RegisterEmail() {
	const { setAddStep } = useRegisterStore();
	const { isTrue, setIsTrue, setIsFalse } = useRegisterStore();
	const { email, emailCode, setEmail, setEmailCode } = useRegisterInfostore();
	const [error, setError] = useState();
	const [text, setText] = useState();

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
			sendmailCode(email);
			setText('인증코드를 발송했습니다.');
		}
	};

	const sendmailCode = async () => {
		const result = await sendEmailCode(email);
	};

	/* 이메일인증 코드 검사 및 확인후 넘기기 */
	const sendEmailCodeCheck = async () => {
		{
			console.log('sendEmailCode 부분');
			const result = await emailCodeCheck(email, emailCode);
			if (result.data == 'sussess') {
				console.log(result);
				setAddStep();
			} else {
				console.log(result);
				setText('다시 인증하시겠습니까?');
			}
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
				{error && <p className='validateEmail-step1-error'>{error}</p>}
				{error && <p className='validateEmail-step1-text'>{text}</p>}
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
					{text && (
						<p
							className='validateEmailcode-step1-text'
							onClick={sendmailCode}
						>
							{text}
						</p>
					)}
				</div>
			)}

			<ButtonPrimary
				className={'send-email-btn'}
				onClick={isTrue == true ? sendEmailCodeCheck : emailCheck}
			>
				이메일 인증
			</ButtonPrimary>
		</div>
	);
}
