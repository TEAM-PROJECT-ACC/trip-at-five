import './login.scss'
import '../../reset.scss';

export default function Login() {
    return (
    <>
     <div className='login-wrap'>
        <div className='login-page up'> <h2>로그인</h2> </div>
        
        <div className='login-page mid'>
            <p>이메일</p>
            <input type="text" placeholder='  Email' /> <br></br>
            <input type="password" placeholder='  비밀번호' /> <br></br>
            <button class="sendBtn">이메일로 시작하기</button>
            <br/>
            <div> 
                <span>회원가입</span>
                <span>비밀번호 재설정</span>
            </div> 
            <br/>
            <hr/>
        </div>

        <div className='login-page bottom'>

        <div class="kakao">
        <img  src="https://developers.kakao.com/tool/resource/static/img/button/kakaosync/complete/ko/kakao_login_large_wide.png"/>
        </div>
        </div>

     </div>
    </>
    )
}