import SnsButton from './button/Login.Sns.Button.component';
import kakao from '../resource/kakao-sns-auth-btn.png';
import naver from '../resource/naver-sns-auth-btn.png';
import google from '../resource/google-sns-auth-btn.png';
import {
	KAKAO_AUTH_URL,
	NAVER_AUTH_URL,
	GOOGLE_AUTH_URL,
	kakaoLogin,
	naverLogin,
	googleLogin,
} from '../loginUtil';
import { LoginSnsStateStore } from '../login-store/loginStore';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import {
	successAlert,
	errorAlert,
	infoAlert,
} from '../../../utils/toastUtils/toastUtils';

export default function SnsButtons() {
	const { setPlaform } = LoginSnsStateStore();

	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const searchTerm = queryParams.get('code');
	const isExecuted = useRef(false);
	const navigate = useNavigate();
	const { plaform } = LoginSnsStateStore();

	useEffect(() => {
		if (searchTerm != null && !isExecuted.current) {
			console.log(searchTerm);

			sendCode();

			isExecuted.current = true;
		}
	}, [searchTerm]);

	const snsLogin = (plaform) => {
		if (plaform == 'kakao') {
			setPlaform(plaform);
			window.location.href = KAKAO_AUTH_URL;
		}
		if (plaform == 'naver') {
			setPlaform(plaform);
			window.location.href = NAVER_AUTH_URL;
		}
		if (plaform == 'google') {
			setPlaform(plaform);
			window.location.href = GOOGLE_AUTH_URL;
		}

		console.log(plaform);
	};

	const sendCode = async () => {
		if (plaform === 'kakao') {
			const kakaoResult = await kakaoLogin(searchTerm);

			if (kakaoResult.data >= 0 && kakaoResult.status == 200) {
				successAlert('login 성공');
				sessionStorage.setItem('Logined', kakaoResult.data);
				navigate('/user');
			} else {
				infoAlert(kakaoResult.data + '로 로그인해주시기 바랍니다.');
			}
		}
		if (plaform === 'naver') {
			const naverResult = await naverLogin(searchTerm);
			if (naverResult.data >= 0 && naverResult.status == 200) {
				successAlert('login 성공');
				sessionStorage.setItem('Logined', naverResult.data);
				navigate('/user');
			} else {
				infoAlert(naverResult.data + '로 로그인해주시기 바랍니다.');
			}
		}
		if (plaform === 'google') {
			const googleResult = await googleLogin(searchTerm);
			if (googleResult.data >= 0 && googleResult.status == 200) {
				successAlert('login 성공');
				sessionStorage.setItem('Logined', googleResult.data);
				navigate('/user');
			} else {
				infoAlert(googleResult.data + '로 로그인해주시기 바랍니다.');
			}
		}
	};

	return (
		<div className='login-page bottom'>
			<div className='sns-logo'>
				<SnsButton
					onClick={() => snsLogin('kakao')}
					Img={kakao}
					alt={'카카오 로그인 이미지'}
				/>

				<SnsButton
					className={'naver-button'}
					onClick={() => snsLogin('naver')}
					Img={naver}
					alt={'네이버 로그인 이미지'}
				/>
				<SnsButton
					onClick={() => snsLogin('google')}
					Img={google}
					alt={'구글 로그인 이미지'}
				/>
			</div>
		</div>
	);
}
