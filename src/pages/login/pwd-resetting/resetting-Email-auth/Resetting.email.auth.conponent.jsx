import { useState } from 'react';
import './resetting.email.auth.conponent.scss';
import { ButtonPrimary } from '../../../../components';
import { ResettingInput } from '../resetting-input/resetting.input.conponent';
import { ResttingTitle } from '../resetting-title/resetting.title.conponent';
import { useIsResetting } from '../state/resetting.state';

export function EmailAuth() {
	const [email, setEmail] = useState(null);
	const [isSend, setIsSend] = useState(false);
	const [emailCode, setEmailCode] = useState();
  const {isTrue, setIsTrue, setIsFalse} = useIsResetting();

	const testCode = '1234';

	const sendCode = () => {
		{
			email != null && setIsSend(true);
		}
	};

	const codeCheck = () => {
		const test = emailCode == testCode ? 'ok' : 'fail';
		console.log(test);
		test == 'ok' && setIsTrue();
	};

	return (
		<div className='pwd-resetting-content-wrap'>
			<ResettingInput
				className={'pwd-resetting-text'}
				text={'이메일'}
				placeholder={'이메일을 입력해주세요'}
				onChange={(e) => {
					setEmail(e.target.value);
				}}
			/>
			{isSend && (
				<>
					<ResettingInput
						className={'pwd-resetting-code-input'}
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

			<ButtonPrimary onClick={isSend ? codeCheck : sendCode}>
				이메일 인증
			</ButtonPrimary>
		</div>
	);
}
