import { ButtonPrimary, InputPrimary } from '../../../../components';
import { useRegisterStore, RegisterInfoStore } from '../RegisterStore';
import './email.component.scss';

export default function RegisterEmail() {
	const { isTrue, setIsTrue, step, setAddStep, setMinusStep, resetStep } =
		useRegisterStore();
	const { email, emailCode, setEmail, setEmailCode } = RegisterInfoStore();

	/*이메일인증 코드 전송 및 인증코드 입력칸 표시*/
	const sendEmailCode = () => {
		{
			email != null ? setIsTrue() : '';
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
			<p className='register-email-text'>이메일 *</p>
			<InputPrimary
				placeholder={'이메일을 입력해주세요'}
				onChange={(e) => {
					setEmail(e.target.value);
				}}
			/>

			{isTrue && (
				<div>
					<p className='register-email-text'>인증 코드</p>
					<InputPrimary
						placeholder={'인증코드를 입력해주세요'}
						onChange={(e) => {
							setEmailCode(e.target.value);
						}}
					/>
				</div>
			)}

			<ButtonPrimary onClick={emailEvent}>이메일 인증</ButtonPrimary>
		</div>
	);
}
