import { useEffect, useState } from 'react';
import {
  ButtonPrimary,
  InputShrink,
  TextLinkButton,
} from '../../../components';
import { LoginStateStore } from '../login-store/loginStore';
import './email.pwd.input.component.scss';
import { validateEmail } from '../../register/util/validate';
import { nomalLogin } from '../loginUtil';
import { useNavigate } from 'react-router-dom';

export default function LoginInputBox() {
  const { id, pwd, setId, setPwd } = LoginStateStore();
  const [error, setError] = useState();
  const navigate = useNavigate();

  /*이메일 형식 체크 */
  useEffect(() => {
    validateEmail(id);
  }, [id]);

  const validateEmailCheck = (e) => {
    const value = e.target.value;
    setId(value);

    if (value.length === 0) {
      setError('');
    } else if (!validateEmail(value)) {
      setError('올바른 이메일 형식이 아닙니다.');
    } else {
      setError('');
    }
  };

  const sendLogin = async () => {
    const result = await nomalLogin(id, pwd);

    if (result.status === 200) {
      navigate('/user');
    }
  };

  return (
    <div className='login-page mid'>
      <InputShrink
        className={'login-email-input'}
        id='email-input'
        type={'email'}
        labelText={'이메일'}
        onChange={validateEmailCheck}
      />
      {error && <p className='validateEmail-text'>{error}</p>}

      <InputShrink
        className={'login-pwd-input'}
        id='pwd-input'
        type={'password'}
        labelText={'비밀번호'}
        onChange={(e) => {
          setPwd(e.target.value);
        }}
      />

      <ButtonPrimary
        className={'login-Btn'}
        onClick={sendLogin}
      >
        이메일로 시작하기
      </ButtonPrimary>

      <div className='register-resetting'>
        <TextLinkButton
          className={'login__font'}
          to='/register'
        >
          회원가입
        </TextLinkButton>
        <TextLinkButton
          className={'login__font'}
          to='/resetting'
        >
          비밀번호 재설정
        </TextLinkButton>
      </div>

      <hr />
    </div>
  );
}
