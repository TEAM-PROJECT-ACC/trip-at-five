import { useEffect, useState } from 'react';
import AccomCalendar from '../../../../../components/accom-search/calendar/AccomCalendar.component';
import NumberOfPeople from '../../../../../components/accom-search/number-of-people/NumberOfPeople.component';
import { ButtonSecondary, InputSecondary } from '../../../../../components';
import { useAccomSearchStore } from '../../../../../states';
import './SearchArea.style.scss';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SearchArea = ({ searchHandler }) => {
  const state = useAccomSearchStore((state) => state);
  const { setKeywordState } = useAccomSearchStore();
  // const [inputValue, setInputValue] = useState('');

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
