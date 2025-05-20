import React, { useEffect, useState } from 'react';
import AccomCalendar from '../../../../../components/accom-search/calendar/AccomCalendar.component';
import './SearchArea.style.scss';
import NumberOfPeople from '../../../../../components/accom-search/number-of-people/NumberOfPeople.component';
import { useAccomSearchStore } from '../../../../../states';
const SearchArea = () => {
  const { keyword, checkIn, checkOut, numberOfPeople, tripDay } = useAccomSearchStore((state) => state);
  const { setKeywordState } = useAccomSearchStore((state) => state.actions);

  useEffect(() => {
    console.log(keyword);
    console.log(checkIn);
    console.log(checkOut);
    console.log(numberOfPeople);
    console.log(tripDay);
  }, [keyword]);

  const searchHandler = async () => {
    const requestData = {
      keyword: keyword,
      checkIn: checkIn,
      checkOut: checkOut,
      numberOfPeople: numberOfPeople,
      tripDay: tripDay,
    };
    console.log(requestData);
  };

  return (
    <div className='search__container'>
      <div className='search-input__container'>
        {/* 추후 공통 컴포넌트로 대체될 예정 */}
        <input
          className='search-input'
          type='search'
          onChange={(data) => setKeywordState(data.target.value)}
          placeholder='가고싶은 곳 혹은 숙박명으로 찾아보세요'
        />
      </div>
      <AccomCalendar className='check-calendar__container' />
      <NumberOfPeople className='number-of-people__container' />
      <button className='search-button' onClick={searchHandler}>
        검색
      </button>
    </div>
  );
};

export default SearchArea;
