import './signUp.tel.conponent.scss';
import { ButtonPrimary, ButtonSecondary, InputPrimary } from "../../../components";
import { MdOutlineRefresh } from 'react-icons/md';


export default function SignUpTel() {

      return(
      <div className='sign-tel-wrap'>
          <p className='sign-tel-text'>전화번호</p>
          <InputPrimary placeholder={'닉네임 입력해주세요'} />
          <div className='sign-tel-btn'>    
          <ButtonSecondary>나중에 입력</ButtonSecondary>     
          <ButtonPrimary >확인</ButtonPrimary>
          
          </div>         
      </div>
      )
}
