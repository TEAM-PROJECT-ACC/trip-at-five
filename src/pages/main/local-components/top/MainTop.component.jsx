import Banner from './banner/Banner.component';
import SearchArea from './search/SearchArea.component';
import './MainTop.style.scss';

const MainTop = () => {
  return (
    <div className='main-top__container'>
      <Banner />
      <SearchArea />
    </div>
  );
};

export default MainTop;
