import React from 'react';
import AccomCalendar from '../../../../../components/accom-search/calendar/AccomCalendar.component';
import './SearchArea.style.scss';
import NumberOfPeople from '../../../../../components/accom-search/number-of-people/NumberOfPeople.component';
const SearchArea = () => {
  return (
    <div className='search-container'>
      <div className='search-input-container'>
        {/* 추후 공통 컴포넌트로 대체될 예정 */}
        <input className='search-input' type='search' placeholder='가고싶은 곳 혹은 숙박명으로 찾아보세요' />
      </div>
      <AccomCalendar className='check-calendar-container' />
      <NumberOfPeople className='number-of-people-container' />
      <button className=''>검색</button>
    </div>
  );
};

export default SearchArea;
