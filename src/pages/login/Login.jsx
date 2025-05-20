import './login.scss'
import '../../reset.scss';
import kakao from './resource/kakao-sns-auth-btn.png'
import naver from './resource/naver-sns-auth-btn.png'
import google from './resource/google-sns-auth-btn.png'



export default function Login() {
    return (
    <>
     <div className='login-wrap'>
        <div className='login-page up'> <h2>로그인</h2> </div>
        
        <div className='login-page mid'>
            <p>이메일</p>
            <input type="text" placeholder='  Email' /> <br></br>
            <input type="password" placeholder='  비밀번호' /> <br></br>
            <button className="sendBtn">이메일로 시작하기</button>
            <br/>
            <div> 
                <button><span>회원가입</span></button>
                <button><span>비밀번호 재설정</span></button>
            </div> 
            <br/>
            <hr/>
        </div>
        

        <div className='login-page bottom'>

        <div className="sns-logo">
        <button><img src={kakao} alt="카카오 로그인 이미지"/></button>
        <button><img src={naver} alt="카카오 로그인 이미지"/></button>
        <button><img src={google} alt="카카오 로그인 이미지"/></button>
        </div>
        </div>

     </div>
    </>
    )
}