import './login.style.scss';
import { useEffect } from 'react';
import { PageContainer } from '../../components';
import LoginInputBox from './login-input/EmailPwdInput.component';
import SnsButtons from './sns/LoginSnsnButtons.component';
import { loginStateStore } from '../../states/login/loginStore';
import { logout } from '../../services/login/loginService';
import { successAlert } from '../../utils/toastUtils/toastUtils';

export default function Login() {
	const { loginInfo } = loginStateStore();

	useEffect(() => {
		if (loginInfo) {
			sessionStorage.removeItem('Logged');
			localStorage.removeItem('userInfo');
		}
	}, []);

	return (
		<PageContainer className={'login-container'}>
			<div className='login-wrap'>
				<div className='login-page up'>
					<h2>로그인</h2>
				</div>
				<LoginInputBox />
				<SnsButtons />
			</div>
		</PageContainer>
	);
}
