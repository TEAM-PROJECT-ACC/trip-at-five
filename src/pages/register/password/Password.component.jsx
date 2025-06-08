import { ButtonPrimary, InputPrimary } from '../../../components';
import { useRegisterStore, RegisterInfostore } from '../RegisterStore';
import './password.component.scss';

export default function RegisterPassword() {
  const { setAddStep } = useRegisterStore();
  const { pwd, setPwd, pwdCheck, setPwdCheck } = RegisterInfostore();

  const passwordCheckOK = () => {
    if (pwd && pwdCheck && pwd.length >= 8 && pwdCheck.length >= 8) {
      setAddStep();
    }
  };

  const passwordCheckFail = pwd !== pwdCheck && '비밀번호가 일치하지 않습니다';

  return (
    <div className='register-password-wrap'>
      <p className='register-password-text'>비밀번호 *</p>
      <InputPrimary
        type={'password'}
        className='register-pwd'
        placeholder={'비밀번호를 입력해주세요'}
        onChange={(e) => {
          setPwd(e.target.value);
        }}
      />
      <p className='register-password-text'>비밀번호 확인*</p>
      <InputPrimary
        type={'password'}
        className='register-pwd-check'
        placeholder={'비밀번호를 재입력해주세요'}
        onChange={(e) => {
          setPwdCheck(e.target.value);
        }}
      />
      <p className='pwd-unconsistent'>{passwordCheckFail}</p>
      <br />
      <ButtonPrimary onClick={passwordCheckOK}>확인</ButtonPrimary>
    </div>
  );
}
