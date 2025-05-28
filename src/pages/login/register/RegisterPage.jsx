import { PageContainer } from '../../../components';
import './registerPage.scss';
import Circle from './cricle/Circle';
import TitleText from './title-text/TitleText.component';
import { useEffect } from 'react';
import { useRegisterStore } from './RegisterStore';
import RegisterEmail from './email/Email.component';
import RegisterPassword from './password/Password.component';
import RegisterNickName from './nickName/NickName.component';
import RegisterTel from './Tel/Tel.component';
import RegisterAdress from './address/Address.component';
import RegisterCompelet from './compelet/Compelte.component';


export default function Register() {
	const { isTrue, setIsTrue, step, setAddStep, setMinusStep, resetStep } =
		useRegisterStore();

	/* 로컬저장소 초기화*/
	useEffect(() => {
		// window.localStorage.clear();
	}, []);

	return (
		<PageContainer>
			<div
				className={`register-wrap 
             ${step == 1 ? (isTrue ? 'register-email-code' : 'register-email') : ''}
             ${step == 2 ? isTrue && 'register-password' : ''}
             ${step == 3 ? isTrue && 'register-nickName' : ''}
             ${step == 4 ? isTrue && 'register-tel' : ''} 
             ${step == 5 ? isTrue && 'register-address' : ''}
             ${step == 6 ? isTrue && 'register-compelet' : ''}
             `}
			>
				<div
					className={`register-wrap-up
              ${
								step == 1
									? isTrue
										? 'register-wrap-up-emailCode'
										: 'register-wrap-up-email'
									: ''
							}
              ${step == 2 ? isTrue && 'register-wrap-up-pwd ' : ''}
              ${step == 3 ? isTrue && 'register-wrap-up-nickName' : ''}
              ${step == 4 ? isTrue && 'register-wrap-up-tel' : ''}
              ${step == 5 ? isTrue && 'register-wrap-up-address' : ''}
              ${step == 6 ? isTrue && 'register-wrap-up-address' : ''}
             `}
				>
					<TitleText text={`${step < 6 ? '회원가입' : '환영합니다.'}`} />
					{step < 6 ? <Circle /> : ''}
				</div>
				<div
					className={`register-wrap-down
              ${
								step == 1
									? isTrue
										? 'register-wrap-down-emailCode'
										: 'register-wrap-down-email'
									: ''
							}
              ${step == 2 ? isTrue && 'register-wrap-down-pwdCode' : ''}
              ${step == 3 ? isTrue && 'register-wrap-down-nickName' : ''}
              ${step == 4 ? isTrue && 'register-wrap-down-tel' : ''}
              ${
								step == 5 ? isTrue && 'register-wrap-down-ddress' : ''
							}                
              ${step == 6 ? isTrue && 'register-wrap-down-ddress' : ''}  
                `}
				>
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
					{step == 6 && <RegisterCompelet />}
				</div>
			</div>
		</PageContainer>
	);
}
