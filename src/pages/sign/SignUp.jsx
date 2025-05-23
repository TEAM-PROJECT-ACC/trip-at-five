
import { PageContainer } from '../../components';
import './sign.scss';
import Circle from './sign-cricle/Circle';
import TitleText from './sign-title-text/TitleText.component';
import SignInputEmail from './signUp-eamil/SignUp.email.conponent';
import useSignUpStore from './SignUpStore';
import SignUpPassword from './signUp-password/SignUp.password.conponent';

import SignUpTel from './sign-tel/SignUp.tel.conponent';
import SignUpAdress from './sign-address/SignUp.address.conponent';
import SignCompeletText from './Sign-compelet-text/Sign-compelteText.conponent';





export default function SignUp() {


   const istrue = false;
//    const istrue = true;

    return(
        <PageContainer>
         {/* <div className='sign-wrap sign-height email'> */}
         {/* <div className={`sign-wrap ${istrue ? "sign-email-code" : "sign-email"}`} > */}
             {/* 주소부분 화면크기 */}
            {/* <div className='sign-wrap sign-address'> */}
            <div className='sign-wrap sign-compelet'>
            <div className='sign-wrap-up' >
                <TitleText text={'회원가입'}/>
                {/* <Circle/> */}

              

            </div>
            <div className='sign-wrap-down'>
                {/*이메일 인증*/ }
                {/* <SignInputEmail />    */}
                 {/*비밀번호 인증*/ } 
                {/* <SignUpPassword />   */}
                  {/* 닉네임 */}
                {/* <SignUpNickName /> */}
                {/* 전화번호 */}
                {/* <SignUpTel/> */}
                {/* 주소 */}
                {/* <SignUpAdress /> */}

            </div>
        </div>
        
        </PageContainer>
    )
}



