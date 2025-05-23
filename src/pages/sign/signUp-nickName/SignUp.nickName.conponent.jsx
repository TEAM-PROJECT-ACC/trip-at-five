import './signUp.nickName.conponent.scss';
import { ButtonPrimary, ButtonSecondary, InputPrimary } from "../../../components";
import { MdOutlineRefresh } from 'react-icons/md';


export default function SignUpNickName() {

      return(
      <div className='sign-nickName-wrap'>
          <p className='sign-nickName-text'>닉네임</p>
          <InputPrimary placeholder={'닉네임 입력해주세요'} />
          <div className='sign-nickname-btn'>         
          <ButtonPrimary >중복 검사</ButtonPrimary>
          <ButtonSecondary>확인</ButtonSecondary>
          </div>         
      </div>
      )
}
