import { ButtonPrimary, InputPrimary } from '../../../components';
import { SignUpInfoStore, useSignUpStore } from '../SignUpStore';
import './signUp.password.conponent.scss';

export default function SignUpPassword() {
	const { step, setAddStep } = useSignUpStore();
	const { pwd, setPwd, pwdCheck, setPwdCheck } = SignUpInfoStore();

	const passwordCheckOK = () => {
		console.log(pwd === pwdCheck && 'Ok');
		step == 2 && setAddStep();
		console.log(step);
	};
	const passwordCheckFail = pwd !== pwdCheck && '비밀번호가 일치하지 않습니다';

	return (
		<div className='sign-password-wrap'>
			<p className='sign-password-text'>비밀번호 *</p>
			<InputPrimary
				type={'password'}
				className='sign-pwd'
				placeholder={'비밀번호를 입력해주세요'}
				onChange={(e) => {
					setPwd(e.target.value);
				}}
			/>
			<p className='sign-password-text'>비밀번호 확인*</p>
			<InputPrimary
				type={'password'}
				className='sign-pwd-check'
				placeholder={'비밀번호를 재입력해주세요'}
				onChange={(e) => {
					setPwdCheck(e.target.value);
				}}
			/>
			<p className='pwd-unconsistent'>{passwordCheckFail}</p>
			<br />
			<ButtonPrimary onClick={passwordCheckOK}>확인</ButtonPrimary>
		</div>
	);
}
