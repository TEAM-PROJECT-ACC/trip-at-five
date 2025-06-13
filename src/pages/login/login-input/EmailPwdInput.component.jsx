import { useEffect, useState } from 'react';
import './emailPwdInput.style.scss';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../../register/util/validate';
import { errorAlert, successAlert } from '../../../utils/toastUtils/toastUtils';
import { adminlLogin, nomalLogin } from '../../../services/login/loginService';
import {
  loginStateStore,
  loginAccountStore,
} from '../../../states/login/loginStore';
import {
  ButtonPrimary,
  InputShrink,
  TextLinkButton,
} from '../../../components';

export default function LoginInputBox() {
  const { id, pwd, setId, setPwd } = loginAccountStore();
  const { loginInfo, setLoginInfo } = loginStateStore();
  const [error, setError] = useState();
  const navigate = useNavigate();

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
  const checkEmailDomain = (id) => {
    return typeof id === 'string' && id.includes('@clock.com');
  };

  const sendLogin = async () => {
    if (id?.length != 0 && pwd?.length != 0) {
      const result = checkEmailDomain(id)
        ? await adminlLogin(id, pwd)
        : await nomalLogin(id, pwd);
      if (result.status === 200) {
        if (result.data.INACTIVE === 'INACTIVE') {
          errorAlert('비활성화된 계정입니다.');
        } else if (result.data.IdFail === 'IdFail') {
          errorAlert('계정을 다시 확인해주세요');
        } else if (result.data.pwdFail === 'pwdFail') {
          errorAlert('pwd를 다시 확인해주세요');
        } else {
          successAlert('login 성공');
          sessionStorage.setItem('Logined', true);
          setLoginInfo(result.data);
        }
        if (result.data.memType === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
    } else {
      console.log('Test');
    }
  };

  /*이메일 형식 체크 */
  useEffect(() => {
    validateEmail(id);
  }, [id]);

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
