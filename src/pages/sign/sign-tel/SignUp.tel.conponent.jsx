import './signUp.tel.conponent.scss';
import { ButtonPrimary, ButtonSecondary, InputPrimary } from "../../../components";
import { MdOutlineRefresh } from 'react-icons/md';
import { SignUpInfoStore, useSignUpStore } from '../SignUpStore';


export default function SignUpTel() {

    const {step, setAddStep} = useSignUpStore();
    const {tel, setTel} = SignUpInfoStore();
    
    const telSkip=() => {
        setAddStep();
    }

    const telOk=()=> {
        tel != null ? setAddStep() : console.log('t');
    }

      return(
      <div className='sign-tel-wrap'>
          <p className='sign-tel-text'>전화번호</p>
          <InputPrimary placeholder={'연락처를 입력해주세요'} onChange={(e) => {setTel(e.target.value)}}/>
          <div className='sign-tel-btn'>    
          <ButtonSecondary onClick={telSkip}>나중에 입력</ButtonSecondary>     
          <ButtonPrimary onClick={telOk}>확인</ButtonPrimary>
          
          </div>         
      </div>
      )
}
