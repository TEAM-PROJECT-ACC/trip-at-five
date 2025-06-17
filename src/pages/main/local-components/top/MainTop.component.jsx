import Banner from './banner/Banner.component';
import SearchArea from './search/SearchArea.component';
import './MainTop.style.scss';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccomSearchStore } from '../../../../states';

const MainTop = () => {
  const state = useAccomSearchStore((state) => state);
  const navigate = useNavigate();

  const searchHandler = async () => {
    if (state.keyword.trim() === '') {
      toast.error('검색어를 입력해주세요.'); // 입력값없으면 애러
      return;
    }

    // setKeywordState(inputValue);
    navigate('/accommodations');

    // 필요한 상태만 추출
    const searchData = {
      keyword: state.keyword,
      checkIn: state.checkIn,
      checkOut: state.checkOut,
      tripDay: state.tripDay,
      numberOfPeople: state.numberOfPeople,
    };
  };

  useEffect(() => {
    // 새로고침 할 경우 검색 상태 초기화
    state.resetState();
  }, []);

  return (
    <div className='main-top__container'>
      <Banner />
      <SearchArea searchHandler={searchHandler} />
    </div>
  );
};

export default MainTop;
