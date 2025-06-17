import { useState } from 'react';
import AccomCalendar from '../../../../../components/accom-search/calendar/AccomCalendar.component';
import NumberOfPeople from '../../../../../components/accom-search/number-of-people/NumberOfPeople.component';
import { ButtonSecondary, InputSecondary } from '../../../../../components';
import { useAccomSearchStore } from '../../../../../states';
import './SearchArea.style.scss';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SearchArea = () => {
  const state = useAccomSearchStore.getState();
  const { setKeywordState } = useAccomSearchStore();
  // const [inputValue, setInputValue] = useState('');
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

  return (
    <div className='search__container'>
      <div className='search-input__container'>
        <InputSecondary
          className='search-input'
          type='search'
          value={state.keyword}
          onChange={(e) => {
            setKeywordState(e.target.value);
          }}
          placeholder='가고싶은 곳 혹은 숙박명으로 찾아보세요'
          required
        />
      </div>
      <AccomCalendar className='check-calendar__container' />
      <NumberOfPeople className='number-of-people__container' />
      <ButtonSecondary
        className='search-button'
        onClick={searchHandler}
        children='검색'
      />
    </div>
  );
};

export default SearchArea;
