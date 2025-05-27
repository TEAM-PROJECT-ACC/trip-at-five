import './login.scss';
import '../../reset.scss';
import kakao from './resource/kakao-sns-auth-btn.png';
import naver from './resource/naver-sns-auth-btn.png';
import google from './resource/google-sns-auth-btn.png';
import {
	TextLinkButton,
	ButtonPrimary,
	InputSecondary,
	PageContainer,
} from '../../components';
import { KAKAO_AUTH_URL } from './loginUtil';
import { useState } from 'react';
import LoginStateStore from '../../states/LoginState';

export default function Login() {
	const [id, setId] = useState('');
	const [pwd, setPwd] = useState('');
	const { isLogin, setIslogin } = LoginStateStore();

	const sendLogin = () => {
		// console.log(KAKAO_AUTH_URL);
		window.location.href = KAKAO_AUTH_URL;
	};

	return (
		<PageContainer>
			<div className='login-wrap'>
				<div className='login-page up'>
					{' '}
					<h2>로그인</h2>{' '}
				</div>

				<div className='login-page mid'>
					<p>이메일</p>
					<InputSecondary
						type={'email'}
						placeholder={'Email'}
						onChange={(e) => {
							setId(e.target.value);
						}}
					/>{' '}
					<br></br>
					<InputSecondary
						type={'password'}
						placeholder={'비밀번호'}
						onChange={(e) => {
							setPwd(e.target.value);
						}}
					/>
					<br></br>
					<ButtonPrimary className={'login-Btn'}>
						이메일로 시작하기
					</ButtonPrimary>
					<br />
					<div>
						<TextLinkButton
							className={'login__font'}
							to='/signUp'
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
					<br />
					<hr />
				</div>

				<div className='login-page bottom'>
					<div className='sns-logo'>
						<button onClick={sendLogin}>
							<img
								src={kakao}
								alt='카카오 로그인 이미지'
							/>
						</button>
						<button>
							<img
								src={naver}
								alt='카카오 로그인 이미지'
							/>
						</button>
						<button>
							<img
								src={google}
								alt='카카오 로그인 이미지'
							/>
						</button>
					</div>
				</div>
			</div>
		</PageContainer>
	);
}
