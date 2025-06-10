import { useState } from 'react';
import './resettingEmailAuthStyle.scss';
import { ButtonPrimary } from '../../../components';
import { useIsResetting } from '../../../states/pwdRestting/resetting.state';
import { ResettingInput } from '../resetting-input/ResettingInputComponent';
import { ResttingTitle } from '../resetting-title/ResettingTitleComponent';
import { validateEmail } from '../../register/util/validate';

export function EmailAuth() {
	const [email, setEmail] = useState(null);
	const [validationCheck, setValidationCheck] = useState(false);
	const [isSend, setIsSend] = useState(false);
	const [emailCode, setEmailCode] = useState();
	const { isTrue, setIsTrue, setIsFalse } = useIsResetting();
	const [error, setError] = useState(false);

	const testCode = '1234';

	/*이메일 인증코드 보내기  */
	const sendCode = () => {
		{
			validationCheck != false && setIsSend(true);
		}
	};

	/* 이메일 형식 체크  */
	validateEmail(email);

	const validateEmailCheck = (e) => {
		const value = e.target.value;
		setEmail(value);
		if (!validateEmail(value)) {
			setError('올바른 이메일 형식이 아닙니다.');
			setValidationCheck(false);
		} else {
			setError(false);
			setValidationCheck(true);
		}
	};

	/* 인증코드 유효성 체크 부분 */
	const codeCheck = () => {
		const result = emailCode == testCode ? 'ok' : 'fail';
		result == 'ok' && setIsTrue();
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
					<ResttingTitle
						className={'pwd-resetting-receive'}
						text={'인증메일을 받지 못하셨나요?'}
					/>
				</>
			)}

			<ButtonPrimary
				className={'email-auth'}
				onClick={isSend ? codeCheck : sendCode}
			>
				이메일 인증
			</ButtonPrimary>
		</div>
	);
}
