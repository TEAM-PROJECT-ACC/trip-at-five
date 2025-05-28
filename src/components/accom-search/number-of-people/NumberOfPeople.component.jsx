import React, { useEffect, useState } from 'react';
import { FaUser } from '../../../assets/icons/index';
import './NumberOfPeople.style.scss';
import { useAccomSearchStore } from '../../../states/accom-search/accomSearchStore';

const NumberOfPeople = ({ ...props }) => {
  const state = useAccomSearchStore((state) => state);
  const { setNumberOfPeople } = useAccomSearchStore((state) => state);

  const setNumberOfPeopleHandler = (data) => {
    if (data === 8) data = '8+';
    setNumberOfPeople(data);
  };

  const numberOfPeopleHandler = () => {
    let result = [];

    for (let i = 0; i < 8; i++) {
      result.push(
        <span
          key={i + 1}
          onClick={() => setNumberOfPeopleHandler(i + 1)}
        >
          {i + 1 <= state.numberOfPeople || state.numberOfPeople === '8+' ? (
            <FaUser className='number-of-people-icon active' />
          ) : (
            <FaUser className='number-of-people-icon' />
          )}
        </span>
      );
    }

    return result;
  };

  return (
    <div {...props}>
      <p className='number-of-people-icon-group'>{numberOfPeopleHandler()}</p>
    </div>
  );
};

export default NumberOfPeople;
