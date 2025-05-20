import React from 'react';
import MainTop from './top/MainTop.component';
import './MainArea.style.scss';
import MainBottom from './bottom/MainBottom.component';

const MainArea = () => {
  return (
    <div className='main-area-container'>
      <MainTop />
      <MainBottom />
    </div>
  );
};

export default MainArea;
