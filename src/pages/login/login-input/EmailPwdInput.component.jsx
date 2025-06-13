import { useEffect, useState } from 'react';
import './emailPwdInput.style.scss';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../../register/util/validate';
import { errorAlert, successAlert } from '../../../utils/toastUtils/toastUtils';
import { adminLogin, normalLogin } from '../../../services/login/loginService';
import {
	loginStateStore,
	loginAccountStore,
} from '../../../states/login/loginStore';
import {
	ButtonPrimary,
	InputShrink,
	TextLinkButton,
} from '../../../components';

export default function LoginInputBox() {
	const { isLogin, setIslogin } = loginAccountStore();
	const [email, setEmail] = useState();
	const [pwd, setPwd] = useState();
	const { loginInfo, setLoginInfo } = loginStateStore();
	const [error, setError] = useState();
	const navigate = useNavigate();

	const checkEmailDomain = (email) => {
		return typeof email === 'string' && email.includes('@clock.com');
	};

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

	const sendLogin = async () => {
		if (email?.length != 0 && pwd?.length != 0) {
			const result = checkEmailDomain(email)
				? await adminLogin(email, pwd)
				: await nomalLogin(email, pwd);
			if (result.status === 200) {
				if (result.data.INACTIVE === 'INACTIVE') {
					errorAlert('비활성화된 계정입니다.');
				} else if (result.data.IdFail === 'IdFail') {
					errorAlert('계정을 다시 확인해주세요');
				} else if (result.data.pwdFail === 'pwdFail') {
					errorAlert('pwd를 다시 확인해주세요');
				} else {
					successAlert('login 성공');
					sessionStorage.setItem('Logged', true);
					setLoginInfo(result.data);
					setIslogin();
				}
				if (result.data.memType === 'admin') {
					navigate('/admin');
				}
				if (result.data.memType === 'user') {
					navigate('/');
					console.log(isLogin);
				}
			}
		} else {
			errorAlert('아이디 또는 비밀번호를 입력하세요');
		}
	};

	/*이메일 형식 체크 */
	useEffect(() => {
		validateEmail(email);
	}, [email]);

	return (
		<div className='login-page mid'>
			<InputShrink
				className={'login-email-input'}
				email='email-input'
				type={'email'}
				labelText={'이메일'}
				onChange={validateEmailCheck}
			/>
			{error && <p className='validateEmail-text'>{error}</p>}

			<InputShrink
				className={'login-pwd-input'}
				email='pwd-input'
				type={'password'}
				labelText={'비밀번호'}
				onChange={(e) => {
					setPwd(e.target.value);
				}}
			/>

			<ButtonPrimary
				className={'login-Btn'}
				onClick={sendLogin}
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
