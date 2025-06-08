import SnsButton from './button/Login.Sns.Button.component';
import kakao from '../resource/kakao-sns-auth-btn.png';
import naver from '../resource/naver-sns-auth-btn.png';
import google from '../resource/google-sns-auth-btn.png';
import { KAKAO_AUTH_URL, NAVER_AUTH_URL, GOOGLE_AUTH_URL } from '../loginUtil';
import { LoginSnsStateStore } from '../login-store/loginStore';

export default function SnsButtons() {
  const { setPlaform } = LoginSnsStateStore();

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
