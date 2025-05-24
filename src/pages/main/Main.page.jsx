import React, { useEffect } from 'react';
import './Main.style.scss';
import MainArea from './local-components/MainArea.component';
import { useAccomSearchStore } from '../../states';

const Main = () => {
  const state = useAccomSearchStore((state) => state);

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
