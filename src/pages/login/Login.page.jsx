import './login.style.scss';
import { useEffect } from 'react';
import { PageContainer } from '../../components';
import LoginInputBox from './login-input/EmailPwdInput.component';
import SnsButtons from './sns/LoginSnsnButtons.component';
import { loginStateStore } from '../../states/login/loginStore';
import { useRegisterStore } from '../../states/register/registerStore';
import { logout } from '../../services/login/loginService';
import { successAlert } from '../../utils/toastUtils/toastUtils';

export default function Login() {
	const { resetRegisterStore } = useRegisterStore();
	const { loginInfo, loginedStateStorereset } = loginStateStore();
	useEffect(() => {
		resetRegisterStore();
		if (loginInfo) {
			loginedStateStorereset();
		}
	}, []);

	const logoutHandler = async () => {
		const result = await logout();
		successAlert('로그아웃 했습니다.');
	};

	return (
		<PageContainer className={'login-container'}>
			<div className='login-wrap'>
				<div className='login-page up'>
					<h2>로그인</h2>
				</div>
				<LoginInputBox />
				<SnsButtons />
				<button onClick={logoutHandler}>로그아웃</button>
			</div>
		</PageContainer>
	);
}
