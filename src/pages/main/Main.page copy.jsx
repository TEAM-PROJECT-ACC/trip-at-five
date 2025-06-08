import { useEffect, useRef, useState } from 'react';
import MainArea from './local-components/MainArea.component';
import { useAccomSearchStore } from '../../states';
import { testServer } from '../../services/test/testServerAPI';
import './Main.style.scss';
import { useLocation } from 'react-router-dom';
import { LoginSnsStateStore } from '../login/login-store/loginStore';
import {
  googleLogin,
  kakaoLogin,
  naverLogin,
} from '../login/loginUtil';
import { useNavigate } from 'react-router-dom';

const MainTest = () => {
  const state = useAccomSearchStore((state) => state);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('code');
  const isExecuted = useRef(false);
  const navigate = useNavigate();
  const { plaform } = LoginSnsStateStore();

  useEffect(() => {
    if (searchTerm != null && !isExecuted.current) {
      console.log(searchTerm);

      sendCode();

      isExecuted.current = true;
    }
  }, [searchTerm]);

  const sendCode = async () => {
    if (plaform === 'kakao') {
      const kakaoResult = await kakaoLogin(searchTerm);
      if (kakaoResult.status === 200) {
        navigate('/user');
      }
    }
    if (plaform === 'naver') {
      const naverResult = await naverLogin(searchTerm);
      if (naverResult.status === 200) {
        navigate('/user');
      }
    }
    if (plaform === 'google') {
      const googleResult = await googleLogin(searchTerm);
      if (googleResult.status === 200) {
        navigate('/user');
      }
    }
  };

  const serverConnectionTest = async () => {
    // Server 연동 테스트
    const result = await testServer();
    console.log('result : ' + result);
  };

  useEffect(() => {
    serverConnectionTest();
  }, []);

  useEffect(() => {
    // 새로고침 할 경우 검색 상태 초기화
    state.resetState();
  }, []);

  return (
    <div className='main-page__container'>
      <MainArea />
    </div>
  );
};

export default MainTest;
