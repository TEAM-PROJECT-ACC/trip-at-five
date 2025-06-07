import { useEffect, useRef, useState } from 'react';
import MainArea from './local-components/MainArea.component';
import { useAccomSearchStore } from '../../states';
import { testServer } from '../../services/test/testServerAPI';
import './Main.style.scss';
import { useLocation } from 'react-router-dom';
import { LoginSnsStateStore } from '../login/login-store/loginStore';
import { KeyTest, kakaoLogin, naverLogin } from '../login/loginUtil';

const MainTest = () => {
  const state = useAccomSearchStore((state) => state);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('code');
  const isExecuted = useRef(false);
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
      const result = await kakaoLogin(searchTerm);
    }
    if (plaform === 'naver') {
      const result = await naverLogin(searchTerm);
    }
  };

  const TestKey = () => {
    console.log(plaform);
    KeyTest();
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
      <button onClick={TestKey}>test</button>
      <MainArea />
    </div>
  );
};

export default MainTest;
