import { ButtonPrimary, InputPrimary } from "../../../components"
import './signUp.password.conponent.scss'


export default function SignUpPassword(){

    return(
      <div className='sign-password-wrap'>
          <p className='sign-password-text'>비밀번호 *</p>
          <InputPrimary type={'password'} placeholder={'비밀번호를 입력해주세요'} />
         <p className='sign-password-text'>비밀번호 확인*</p>
          <InputPrimary type={'password'} placeholder={'비밀번호를 재입력해주세요'} />
         <ButtonPrimary >확인</ButtonPrimary>
      </div>
    )
}