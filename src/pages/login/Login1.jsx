import './login.scss'
import '../../reset.scss';
import kakao from './resource/kakao-sns-auth-btn.png'
import naver from './resource/naver-sns-auth-btn.png'
import google from './resource/google-sns-auth-btn.png'
import { TextLinkButton, ButtonPrimary, InputSecondary } from '../../components';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { VITE_KAKAO_REDIRECT_URI, VITE_KAKAO_REST_KEY } from '../../../env.config';
import axios from 'axios';


// kakao 소셜 로그인 테스트를 위한 페이지 확인 후 추후 제거 예정


export default function Login1() {

const code = new URL(document.location.toString()).searchParams.get("code");
 

    return (
    <>
     <div className='login-wrap'>
        <div className='login-page up'> <h2>로그인</h2> </div>
        
        <div className='login-page mid'>
            <p>이메일</p>
            <InputSecondary type={'email'} placeholder={'Email'} /> <br></br>
            <InputSecondary type={'password'} placeholder={'비밀번호'} /><br></br>
            <ButtonPrimary className={'login-Btn'} >이메일로 시작하기</ButtonPrimary>
            <br/>
            <div> 
                <TextLinkButton className={'login__font'}>회원가입</TextLinkButton>
                <TextLinkButton className={'login__font'}>비밀번호 재설정</TextLinkButton>
            </div> 
            <br/>
            <hr/>
        </div>
        

        <div className='login-page bottom'>

        <div className="sns-logo">
        <Link to="/"><button><img src={kakao} alt="카카오 로그인 이미지"/></button></Link>
        <button><img src={naver} alt="카카오 로그인 이미지"/></button>
        <button><img src={google} alt="카카오 로그인 이미지"/></button>
        </div>
        </div>

     </div>
    </>
    )
}