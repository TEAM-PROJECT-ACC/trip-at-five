import { useState } from "react";
import './password-resetting.conponent.scss'
import { ResettingInput } from "../resetting-input/resetting.input.conponent";
import { ResttingTitle } from "../resetting-title/resetting.title.conponent";
import { ButtonPrimary } from "../../../../components";


export function PasswordResetting({className}) {


    const [email, setEmail] = useState(null);
    const [isSend, setIsSend] = useState(false);
    const [emailCode, setEmailCode] = useState();
    
    const testCode = '1234';
    
    const sendCode =() => {
        {email !=null && setIsSend(true)};
             
    }
    
    const codeCheck =() => {
        const test = (emailCode == testCode ? 'ok' : 'fail');
        console.log(test);
    }

    return(
            <div className='pwd-resetting-content-wrap'>

            <ResettingInput className={'pwd-resetting-text'} text={'비밀번호'} placeholder={'비밀번호를 입력해주세요'} onChange={e=>{setEmail(e.target.value)}}  />

            <ResettingInput className={'pwd-resetting-code-input'}  type={'email'} text={'비밀번호 확인'} placeholder={'다시한번 입력해주세요'} onChange={e=>{setEmailCode(e.target.value)}} /> 
            <ResttingTitle className={'pwd-resetting-receive color' } text={'비밀번호가 일치하지 않습니다.'}/>
            

            <ButtonPrimary onClick={ isSend ? codeCheck :sendCode} >비밀번호 재설정</ButtonPrimary>
            </div>
    )
}