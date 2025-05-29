import './loginPage.scss';
import '../../reset.scss';
import kakao from './resource/kakao-sns-auth-btn.png';
import naver from './resource/naver-sns-auth-btn.png';
import google from './resource/google-sns-auth-btn.png';
import { PageContainer } from '../../components';
import { KAKAO_AUTH_URL } from './loginUtil';
import LoginInputBox from './login-input/Email.Pwd.Input.component';
import SnsButton from './sns/sns-buttion/Login.Sns.Button.component';

export default function Login() {
	const sendLogin = () => {
		// console.log(KAKAO_AUTH_URL);
		window.location.href = KAKAO_AUTH_URL;
	};

	return (
		<PageContainer className={'login-container'}>
			<div className='login-wrap'>
				<div className='login-page up'>
					<h2>로그인</h2>
				</div>

				<LoginInputBox />

				<div className='login-page bottom'>
					<div className='sns-logo'>
						<SnsButton
							onClick={sendLogin}
							Img={kakao}
							alt={'카카오 로그인 이미지'}
						/>
						<SnsButton
							className={'naver-button'}
							Img={naver}
							alt={'네이버 로그인 이미지'}
						/>
						<SnsButton
							Img={google}
							alt={'구글 로그인 이미지'}
						/>
					</div>
				</div>
			</div>
		</PageContainer>
	);
}
