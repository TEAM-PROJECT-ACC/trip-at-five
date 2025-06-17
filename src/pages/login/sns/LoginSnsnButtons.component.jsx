import SnsButton from './button/LoginSnsButton.component';
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
} from '../../../services/login/loginService';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import {
	successAlert,
	infoAlert,
	errorAlert,
} from '../../../utils/toastUtils/toastUtils';
import {
	loginAccountStore,
	loginSnsStateStore,
	loginStateStore,
} from '../../../states/login/loginStore';

export default function SnsButtons() {
	const { platform, setPlatform } = loginSnsStateStore();
	const { setIslogin } = loginAccountStore();

	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const searchTerm = queryParams.get('code');
	const isExecuted = useRef(false);
	const navigate = useNavigate();
	const { loginInfo, setLoginInfo } = loginStateStore();

	const resultProcessing = (result) => {
		if (result.data.memSq >= 0 && result.status == 200) {
			successAlert('login 성공');
			sessionStorage.setItem('Logged', true);
			setLoginInfo(result.data);
			setIslogin();
			navigate('/');
		} else if (result.data.INACTIVE === 'INACTIVE') {
			errorAlert('비활성화 된 계정입니다.');
		} else {
			infoAlert(result.data.ckSocPlt + '로 로그인해주시기 바랍니다.');
		}
	};

	const sendCode = async () => {
		if (platform === 'kakao') {
			const kakaoResult = await kakaoLogin(searchTerm);
			resultProcessing(kakaoResult);
		}

		if (platform === 'naver') {
			const naverResult = await naverLogin(searchTerm);
			resultProcessing(naverResult);
		}
		if (platform === 'google') {
			const googleResult = await googleLogin(searchTerm);
			resultProcessing(googleResult);
		}
	};

	const snsLogin = (snsPlatform) => {
		if (snsPlatform == 'kakao') {
			setPlatform(snsPlatform);
			window.location.href = KAKAO_AUTH_URL;
		}
		if (snsPlatform == 'naver') {
			setPlatform(snsPlatform);
			window.location.href = NAVER_AUTH_URL;
		}
		if (snsPlatform == 'google') {
			setPlatform(snsPlatform);
			window.location.href = GOOGLE_AUTH_URL;
		}
	};

	useEffect(() => {
		if (searchTerm != null && !isExecuted.current) {
			sendCode();
			isExecuted.current = true;
		}
	}, [searchTerm]);

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
