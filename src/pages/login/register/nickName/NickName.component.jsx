import './nickName.component.scss';
import { ButtonPrimary, ButtonSecondary, InputPrimary } from "../../../../components";
import {MdOutlineRefresh} from '../../../../assets/icons/logo/kkh/index'
import { RegisterInfoStore, useRegisterStore } from '../RegisterStore';
import { nickNameMaker } from './NickName-sample/NickName.sample';


export default function RegisterNickName() {

    const {step, setAddStep} = useRegisterStore();
    const {nickName, setnickName, nickCheck, setnickNameCheck} = RegisterInfoStore();
   
    /* 닉네임 추천 및 초기화 */
    const resetNickName = () => {
        const nick = nickNameMaker();
        setnickName(nick);
        setnickNameCheck(true);
        

    }

    const nickNameDuplicateCheck = () => {
        const result = document.querySelector('.nickName-duplicate-check');
        const text = nickName == nickName && nickCheck == true ? '사용 가능한 닉네임입니다.' :'이미 사용중인 닉네임입니다.';

        result.innerText=text;

    }

    const nickNameOk= ()=> {
        setAddStep();
    }



      return(
      <div className='register-nickName-wrap'>
          <div className='register-nickName-overlap'>
          <p className='register-nickName-text'>닉네임</p>
          <InputPrimary  placeholder={'닉네임 입력해주세요'} onChange={(e) => {setnickName(e.target.value)}} value={nickName}/>
          <MdOutlineRefresh className='overlap-icon' onClick={resetNickName}/>
          <p className={`nickName-duplicate-check ${nickCheck == true ?'nickName-duplicate-check-ok':'nickName-duplicate-check-fail' }`} >   </p>
          </div>

          <div className='register-nickname-btn'>         
          <ButtonPrimary onClick={nickNameDuplicateCheck} >중복 검사</ButtonPrimary>
          <ButtonSecondary onClick={nickNameOk}>확인</ButtonSecondary>

          </div>         
      </div>
      )
}
