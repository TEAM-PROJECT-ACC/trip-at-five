import { ButtonPrimary, InputPrimary } from "../../../components";
import useSignUpStore from "../SignUpStore";
import './signUp.email.conponent.scss';


export default function SignInputEmail(){


    const {istrue , setIstrue} = useSignUpStore();


    const emailCode = () =>{
        console.log({istrue});
        //  setIstrue(true);
    }


    return(
        <div className='sign-email-wrap'>
            <p className='sign-email-text'>이메일 *</p>
            <InputPrimary placeholder={'이메일을 입력해주세요'} />

            {/* <p className='sign-email-text'>인증 코드</p>
            <InputPrimary placeholder={'이메일을 입력해주세요'} /> */}

            <ButtonPrimary onClick={emailCode}>이메일 인증</ButtonPrimary>
        </div>
    )
}