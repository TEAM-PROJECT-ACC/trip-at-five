import { useState } from 'react';
import {
	ButtonPrimary,
	InputShrink,
	TextLinkButton,
} from '../../../components';
import LoginStateStore from '../login-store/loginStore';
import './email.pwd.input.component.scss';
import { validateEmail } from '../util/validateEmail';

export default function LoginInputBox() {
	const { id, pwd, setId, setPwd } = LoginStateStore();
	const [error, setError] = useState();

	/* 추후 유효성 체크 */
	const test = () => {
		const t = id == pwd ? 'ok' : 'fail';
		console.log(t);
	};

	/*이메일 형식 체크 */
	validateEmail(id);

	const validateEmailCheck = (e) => {
		const value = e.target.value;
		setId(value);
		if (!validateEmail(value)) {
			setError('올바른 이메일 형식이 아닙니다.');
		} else {
			setError('');
		}
	};

	return (
		<div className='login-page mid'>
			<InputShrink
				className={'login-email-input'}
				id='email-input'
				type={'email'}
				labelText={'이메일'}
				onChange={validateEmailCheck}
			/>
			{error && <p className='validateEmail-text'>{error}</p>}

			<InputShrink
				className={'login-pwd-input'}
				id='pwd-input'
				type={'password'}
				labelText={'비밀번호'}
				onChange={(e) => {
					setPwd(e.target.value);
				}}
			/>

			<ButtonPrimary
				className={'login-Btn'}
				onClick={test}
			>
				이메일로 시작하기
			</ButtonPrimary>

			<div className='register-resetting'>
				<TextLinkButton
					className={'login__font'}
					to='/register'
				>
					회원가입
				</TextLinkButton>
				<TextLinkButton
					className={'login__font'}
					to='/resetting'
				>
					비밀번호 재설정
				</TextLinkButton>
			</div>

			<hr />
		</div>
	);
}
