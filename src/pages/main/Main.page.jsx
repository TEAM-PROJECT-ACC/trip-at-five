import { useEffect } from 'react';
import MainArea from './local-components/MainArea.component';
import { useAccomSearchStore } from '../../states';
import { testServer } from '../../services/test/testServerAPI';
import './Main.style.scss';

const Main = () => {
  const state = useAccomSearchStore((state) => state);

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

export default Main;
