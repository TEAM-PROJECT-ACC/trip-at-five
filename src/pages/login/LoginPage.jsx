import './loginPage.scss';
import '../../reset.scss';
import { PageContainer } from '../../components';
import LoginInputBox from './login-input/Email.Pwd.Input.component';
import SnsButtons from './sns/LoginSnsnButtons';
import { logout } from './loginUtil';
import { useRegisterStore } from '../register/RegisterStore';
import { useEffect } from 'react';

export default function Login() {
  const { reset } = useRegisterStore();

  useEffect(() => {
    reset();
  }, []);

  const Test = async () => {
    const result = await logout();
    console.log(result);
  };

  return (
    <PageContainer className={'login-container'}>
      <div className='login-wrap'>
        <div className='login-page up'>
          <h2>로그인</h2>
        </div>
        <LoginInputBox />
        <SnsButtons />
        <button onClick={Test}>로그아웃</button>
      </div>
    </PageContainer>
  );
}
