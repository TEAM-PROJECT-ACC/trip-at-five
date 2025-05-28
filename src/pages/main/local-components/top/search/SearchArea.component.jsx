import { useState } from 'react';
import AccomCalendar from '../../../../../components/accom-search/calendar/AccomCalendar.component';
import NumberOfPeople from '../../../../../components/accom-search/number-of-people/NumberOfPeople.component';
import { ButtonSecondary, InputSecondary } from '../../../../../components';
import { useAccomSearchStore } from '../../../../../states';
import './SearchArea.style.scss';

const SearchArea = () => {
  const state = useAccomSearchStore.getState();
  const { setKeywordState } = useAccomSearchStore();

  const [inputValue, setInputValue] = useState('');

  const searchHandler = async () => {
    setKeywordState(inputValue);
    // 필요한 상태만 추출
    const searchData = {
      keyword: inputValue,
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
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          placeholder='가고싶은 곳 혹은 숙박명으로 찾아보세요'
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
