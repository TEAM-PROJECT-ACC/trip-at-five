import './loginPage.scss';
import '../../reset.scss';
import { useEffect } from 'react';
import { PageContainer } from '../../components';
import LoginInputBox from './login-input/Email.Pwd.Input.component';
import SnsButtons from './sns/LoginSnsnButtons';
import { useRegisterStore } from '../../states/register/RegisterStore';
import { logout } from '../../services/login/loginApi';
import { loginStateStore } from '../../states/login/loginStore';

export default function Login() {
	const { reset } = useRegisterStore();
	const { loginInfo, loginedStateStorereset } = loginStateStore();
	useEffect(() => {
		reset();
		if (loginInfo) {
			loginedStateStorereset();
		}
	}, []);

	const Test = async () => {
		const result = await logout();
		console.log(result);
	};

	return (
		<PageContainer className={'login-container'}>
			<div className='login-wrap'>
				<div className='login-page up'>
					<h2>로그인</h2>
				</div>
				<LoginInputBox />
				<SnsButtons />
				<button onClick={Test}>로그아웃</button>
			</div>
		</PageContainer>
	);
}
