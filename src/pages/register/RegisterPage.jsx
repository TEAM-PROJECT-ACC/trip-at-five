import { PageContainer } from '../../components';
import './registerPage.scss';
import Circle from './cricle/Circle';
import TitleText from './title-text/TitleText.component';
import { useRegisterStore } from './RegisterStore';
import RegisterEmail from './email/Email.component';
import RegisterPassword from './password/Password.component';
import RegisterNickName from './nickName/NickName.component';
import RegisterTel from './Tel/Tel.component';
import RegisterAdress from './address/Address.component';
import RegisterComple from './comple/Comple.component';

export default function Register() {
	const { step } = useRegisterStore();

	return (
		<PageContainer className='register-container'>
			<div className={`register-wrap register-email`}>
				<div className={`register-wrap-up`}>
					<TitleText
						className={'regitster-main-title'}
						text={`${step < 6 ? '회원가입' : '환영합니다.'}`}
					/>
					{step < 6 ? <Circle /> : ''}
				</div>
				<div className={`register-wrap-down`}>
					{/*이메일 인증*/}
					{step == 1 && <RegisterEmail />}
					{/*비밀번호 인증*/}
					{/* <SignUpPassword />   */}
					{step == 2 && <RegisterPassword />}
					{/* 닉네임 */}
					{/* <SignUpNickName /> */}
					{step == 3 && <RegisterNickName />}
					{/* 전화번호 */}
					{/* <SignUpTel/> */}
					{step == 4 && <RegisterTel />}
					{/* 주소 */}
					{/* <SignUpAdress /> */}
					{step == 5 && <RegisterAdress />}
					{step == 6 && <RegisterComple />}
				</div>
			</div>
		</PageContainer>
	);
}
