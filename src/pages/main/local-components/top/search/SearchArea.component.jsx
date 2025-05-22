import React, { useEffect, useState } from 'react';
import AccomCalendar from '../../../../../components/accom-search/calendar/AccomCalendar.component';
import './SearchArea.style.scss';
import NumberOfPeople from '../../../../../components/accom-search/number-of-people/NumberOfPeople.component';
import { useAccomSearchStore } from '../../../../../states';
import { ButtonSecondary, InputSecondary, InputShrink } from '../../../../../components';
const SearchArea = () => {
  const state = useAccomSearchStore.getState();
  const { setKeywordState } = useAccomSearchStore();

  const [inputValue, setInputValue] = useState('');

  const searchHandler = async () => {
    console.log(inputValue);
    setKeywordState(inputValue);
    // 필요한 상태만 추출
    const searchData = {
      keyword: inputValue,
      checkIn: state.checkIn,
      checkOut: state.checkOut,
      tripDay: state.tripDay,
      numberOfPeople: state.numberOfPeople,
    };

    // localStorage에 수동 저장
    // localStorage.setItem('accomSearchStore', JSON.stringify(searchData));
  };

  // useEffect(() => {
  //   console.log(inputValue);
  //   console.log(checkIn);
  //   console.log(checkOut);
  //   console.log(numberOfPeople);
  //   console.log(tripDay);
  // }, [inputValue]);

  return (
    <div className='search__container'>
      <div className='search-input__container'>
        {/* 추후 공통 컴포넌트로 대체될 예정 */}
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
      <ButtonSecondary className='search-button' onClick={searchHandler} children='검색' />
    </div>
  );
};

export default SearchArea;
