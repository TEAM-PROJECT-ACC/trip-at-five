import './nickName.component.scss';
import {
  ButtonPrimary,
  ButtonSecondary,
  InputPrimary,
} from '../../../components';
import { MdOutlineRefresh } from '../../../assets/icons/kkh/index';
import { nickNameMaker } from './NickName-sample/NickName.sample';
import { RegisterInfostore, useRegisterStore } from '../RegisterStore';
import { nickNameDuplicationCheck } from '../../../services/register/apiService';

export default function RegisterNickName() {
  const { setAddStep } = useRegisterStore();
  const { nickName, setNickName, nickNameCheck, setNickNameCheckTrue, setNickNameCheckFalse } =
    RegisterInfostore();

  let text = '';

  const resetNickName = async () => {
    let nick = nickNameMaker();
    setNickName(nick);

    const response = await nickNameDuplicationCheck(nick);

    console.log(response);

    if (response == 1) {
      return resetNickName();
    }

    if (response.data == 0) {
      text = '사용 가능한 닉네임입니다.';
      setNickNameCheckTrue();
    }

    const result = document.querySelector('.nickName-duplicate-check');
    if (result) {
      result.innerText = text;
    }
  };

  const nickNameDuplicateCheck = async () => {
    const respone = await nickNameDuplicationCheck(nickName);
    if (respone.data == 0) {
      text = '사용 가능한 닉네임입니다.';
      setNickNameCheckTrue();
    } else {
      text = '이미 사용중인 닉네임입니다.';
      setNickNameCheckFalse(false);
    }
    const result = document.querySelector('.nickName-duplicate-check');
    if (result) {
      result.innerText = text;
    }
  };

  const nickNameOk = () => {
    nickNameCheck && true && setAddStep();
  };

  return (
    <div className='register-nickName-wrap'>
      <div className='register-nickName-overlap'>
        <p className='register-nickName-text'>닉네임</p>
        <InputPrimary
          className={'register-nickName-input'}
          placeholder={'닉네임 입력해주세요'}
          onChange={(e) => {
            setNickName(e.target.value);
          }}
          value={nickName === null ? '' : nickName}
        />
        <MdOutlineRefresh
          className='overlap-icon'
          onClick={resetNickName}
        />
        <p
          className={`nickName-duplicate-check ${
            nickNameCheck == true
              ? 'nickName-duplicate-check-ok'
              : 'nickName-duplicate-check-fail'
          }`}
        >
          {' '}
        </p>
      </div>

      <div className='register-nickname-btn'>
        <ButtonPrimary
          className={'nickname-btn-duplicate'}
          onClick={nickNameDuplicateCheck}
        >
          중복 검사
        </ButtonPrimary>
        <ButtonSecondary
          className={'nickName-btn-check'}
          onClick={nickNameOk}
        >
          확인
        </ButtonSecondary>
      </div>
    </div>
  );
}
