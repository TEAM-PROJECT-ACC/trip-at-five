import { ButtonPrimary, InputPrimary } from "../../../components";
import  {useSignUpStore, SignUpInfoStore } from "../SignUpStore";
import './signUp.email.conponent.scss';


export default function SignInputEmail(){


    const {isTrue , setIsTrue, step, setAddStep, setMinusStep, resetStep} = useSignUpStore();
    const {email, emailCode, setEmail, setEmailCode} = SignUpInfoStore();


    /*이메일인증 코드 전송 및 인증코드 입력칸 표시*/
    const sendEmailCode = () =>{
        {email != null ? setIsTrue() : ''};
        
    }

    /* 인증코드 체크 부분*/
    const emailCodeCheck = () => {

        console.log(email === emailCode ? 'ok' : 'fail');
        step === 1 ? setAddStep() : '';
    }

    /* step상태에 따라  sendEmailCode, emailCodeCheck 선택 실행*/
    const emailEvent = () => {

        step === 1 && isTrue === false  ?  sendEmailCode() : emailCodeCheck();
    }



  return(
    <div className='sign-email-wrap'>
        <p className='sign-email-text'>이메일 *</p>
          <InputPrimary placeholder={'이메일을 입력해주세요'} onChange={(e) => {setEmail(e.target.value)}}/>

            {isTrue &&
             <div>
             <p className='sign-email-text'>인증 코드</p>
             <InputPrimary placeholder={'인증코드를 입력해주세요'} onChange={(e) => {setEmailCode(e.target.value)}}/> 
             </div>
            }
                
        <ButtonPrimary onClick={emailEvent}>이메일 인증</ButtonPrimary>
    </div>
  )
}