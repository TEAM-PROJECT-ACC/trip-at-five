import SnsButton from './button/Login.Sns.Button.component';
import kakao from '../resource/kakao-sns-auth-btn.png';
import naver from '../resource/naver-sns-auth-btn.png';
import google from '../resource/google-sns-auth-btn.png';
import { KAKAO_AUTH_URL } from '../loginUtil';

export default function SnsButtons() {
	const sendLogin = () => {
		window.location.href = KAKAO_AUTH_URL;
		// const result = await sendkakaoTest();
		console.log(result);

	};

	return (
		<div className='login-page bottom'>
			<div className='sns-logo'>
				<a href={KAKAO_AUTH_URL}>
				<SnsButton
					// onClick={sendLogin}
					Img={kakao}
					alt={'카카오 로그인 이미지'}
				/>
				</a>
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
	);
}
