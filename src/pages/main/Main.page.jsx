import React from 'react';
import './Main.style.scss';
import MainArea from './local-components/MainArea.component';

const Main = () => {
  return (
    <div className='main-page__container'>
      {/* 추후 삭제할 예정 */}
      <a href='accommodations/1/reservations'>예약페이지</a>
      <MainArea />
    </div>
  );
};

export default Main;
