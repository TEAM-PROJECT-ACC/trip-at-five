import MainTop from './top/MainTop.component';
import MainBottom from './bottom/MainBottom.component';
import './MainArea.style.scss';

const MainArea = () => {
  return (
    <div className='main-area__container'>
      <MainTop />
      <MainBottom />
    </div>
  );
};

export default MainArea;
