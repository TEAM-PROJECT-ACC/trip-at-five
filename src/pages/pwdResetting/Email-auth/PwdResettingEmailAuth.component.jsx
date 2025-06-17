import { useEffect, useState } from 'react';
import './PwdResettingEmailAuth.style.scss';
import { ButtonPrimary } from '../../../components';
import {
	useIsResetting,
	useResettingInfo,
} from '../../../states/pwdResetting/pwdResettingStore';
import { ResettingInput } from '../resetting-input/PwdResettingInput.component';
import { ResettingTitle } from '../resetting-title/PwdResettingTitle.component';
import { validateEmail } from '../../register/util/validate';
import {
	emailCodeCheck,
	emailDuplicationCheck,
	sendEmailCode,
} from '../../../services/register/apiService';
import { errorAlert } from '../../../utils/toastUtils/toastUtils';

export function EmailAuth() {
	const { email, setEmail } = useResettingInfo();
	const [setValidationCheck] = useState(false);
	const [isSend, setIsSend] = useState(false);
	const [emailCode, setEmailCode] = useState();
	const { setIsTrue, setIsFalse } = useIsResetting();
	const [error, setError] = useState(false);

	/* 이메일 형식 체크  */
	const validateEmailCheck = (e) => {
		const value = e.target.value;
		setEmail(value);

		if (value.length === 0) {
			setError('');
			if (!validateEmail(value)) {
				setError('올바른 이메일 형식이 아닙니다.');
				setValidationCheck(false);
			} else {
				setError(false);
				setValidationCheck(true);
			}
		} else {
			setError('');
		}
	};

	/*이메일 중복체크  */
	const sendEmail = async () => {
		try {
			const response = await emailDuplicationCheck(email);
			if (response.data == 0) {
				setIsFalse();
				errorAlert('가입한 이메일이 없습니다.');
			} else {
				// 	/*인증코드 보내기*/
				setIsSend(true);
				const result = await sendCode(email);
			}
		} catch (error) {
			errorAlert('실패');
		}
	};

	/* 인증코드 보내기*/
	const sendCode = async (email) => {
		const result = await sendEmailCode(email);
		return result;
	};

	/* 인증코드 유효성 체크 부분 */
	const codeCheck = async () => {
		const result = await emailCodeCheck(email, emailCode);
		if (result.status === 200 && result.data === 'sussess') {
			setIsTrue();
		}
	};

	return (
		<div className='pwd-resetting-content-wrap'>
			<ResettingInput
				TclassName={'pwd-resetting-email-text'}
				IclassName={'pwd-resetting-email-input'}
				text={'이메일'}
				placeholder={'이메일을 입력해주세요'}
				onChange={validateEmailCheck}
			/>
			{error && <p className='pwd-resetting-validateEmail-text'>{error}</p>}
			{isSend && (
				<>
					<ResettingInput
						TclassName={'pwd-resetting-email-code-text'}
						IclassName={'pwd-resetting-email-code-input'}
						type={'email'}
						text={'인증코드'}
						placeholder={'인증코드를 입력해주세요'}
						onChange={(e) => {
							setEmailCode(e.target.value);
						}}
					/>
					<ResettingTitle
						className={'pwd-resetting-receive'}
						text={'인증메일을 받지 못하셨나요?'}
					/>
				</>
			)}

			<ButtonPrimary
				className={'email-auth'}
				onClick={isSend ? codeCheck : sendEmail}
			>
				이메일 인증
			</ButtonPrimary>
		</div>
	);
}
