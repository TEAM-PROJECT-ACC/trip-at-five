import { useEffect } from 'react';
import MainArea from './local-components/MainArea.component';
import { useAccomSearchStore } from '../../states';
// import { testServer } from '../../services/test/testServerAPI';
import './Main.style.scss';

const Main = () => {
  return (
    <div className='main-page__container'>
      <MainArea />
    </div>
  );
};

export default Main;
