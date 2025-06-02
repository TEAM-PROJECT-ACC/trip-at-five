import './loginPage.scss';
import '../../reset.scss';
import { PageContainer } from '../../components';
import LoginInputBox from './login-input/Email.Pwd.Input.component';
import SnsButtons from './sns/LoginSnsnButtons';

export default function Login() {

	return (
		<PageContainer className={'login-container'}>
			<div className='login-wrap'>
				<div className='login-page up'>
					<h2>로그인</h2>
				</div>
				<LoginInputBox />
				<SnsButtons/>
			</div>
		</PageContainer>
	);
}
