import { PageContainer } from '../../components';
import './sign.scss';
import Circle from './sign-cricle/Circle';
import TitleText from './sign-title-text/TitleText.component';
import SignInputEmail from './signUp-eamil/SignUp.email.conponent';
import { useSignUpStore } from './SignUpStore';
import SignUpPassword from './signUp-password/SignUp.password.conponent';

import SignUpTel from './sign-tel/SignUp.tel.conponent';
import SignUpAdress from './sign-address/SignUp.address.conponent';
import SignCompeletText from './Sign-compelet-text/Sign-compelte.conponent';
import { useEffect } from 'react';
import SignUpNickName from './signUp-nickName/SignUp.nickName.conponent';
import SignCompelet from './Sign-compelet-text/Sign-compelte.conponent';

export default function SignUp() {
	const { isTrue, setIsTrue, step, setAddStep, setMinusStep, resetStep } =
		useSignUpStore();

	/* 로컬저장소 초기화*/
	useEffect(() => {
		// window.localStorage.clear();
	}, []);

	return (
		<PageContainer>
			<div
				className={`sign-wrap 
             ${step == 1 ? (isTrue ? 'sign-email-code' : 'sign-email') : ''}
             ${step == 2 ? isTrue && 'sign-password' : ''}
             ${step == 3 ? isTrue && 'sign-nickName' : ''}
             ${step == 4 ? isTrue && 'sign-tel' : ''} 
             ${step == 5 ? isTrue && 'sign-address' : ''}
             ${step == 6 ? isTrue && 'sign-compelet' : ''}
             `}
			>
				<div
					className={`sign-wrap-up
              ${
								step == 1
									? isTrue
										? 'sign-wrap-up-emailCode'
										: 'sign-wrap-up-email'
									: ''
							}
              ${step == 2 ? isTrue && 'sign-wrap-up-pwd ' : ''}
              ${step == 3 ? isTrue && 'sign-wrap-up-nickName' : ''}
              ${step == 4 ? isTrue && 'sign-wrap-up-tel' : ''}
              ${step == 5 ? isTrue && 'sign-wrap-up-address' : ''}
              ${step == 6 ? isTrue && 'sign-wrap-up-address' : ''}
             `}
				>
					<TitleText text={`${step < 6 ? '회원가입' : '환영합니다.'}`} />
					{step < 6 ? <Circle /> : ''}
				</div>
				<div
					className={`sign-wrap-down
              ${
								step == 1
									? isTrue
										? 'sign-wrap-down-emailCode'
										: 'sign-wrap-down-email'
									: ''
							}
              ${step == 2 ? isTrue && 'sign-wrap-down-pwdCode' : ''}
              ${step == 3 ? isTrue && 'sign-wrap-down-nickName' : ''}
              ${step == 4 ? isTrue && 'sign-wrap-down-tel' : ''}
              ${
								step == 5 ? isTrue && 'sign-wrap-down-ddress' : ''
							}                
              ${step == 6 ? isTrue && 'sign-wrap-down-ddress' : ''}  
                `}
				>
					{/*이메일 인증*/}
					{step == 1 && <SignInputEmail />}
					{/*비밀번호 인증*/}
					{/* <SignUpPassword />   */}
					{step == 2 && <SignUpPassword />}
					{/* 닉네임 */}
					{/* <SignUpNickName /> */}
					{step == 3 && <SignUpNickName />}
					{/* 전화번호 */}
					{/* <SignUpTel/> */}
					{step == 4 && <SignUpTel />}
					{/* 주소 */}
					{/* <SignUpAdress /> */}
					{step == 5 && <SignUpAdress />}
					{step == 6 && <SignCompeletText />}
				</div>
			</div>
		</PageContainer>
	);
}
