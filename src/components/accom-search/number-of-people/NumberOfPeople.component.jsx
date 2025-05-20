import React, { useState } from 'react';
import { FaUser } from '../../../assets/icons/index';
import './NumberOfPeople.style.scss';
import { useAccomSearchStore } from '../../../states/accom-search/accomSearchStore';

const NumberOfPeople = ({ ...props }) => {
  const { numberOfPeople } = useAccomSearchStore((state) => state);
  const { setNumberOfPeople } = useAccomSearchStore((state) => state.actions);

  const numberOfPeopleHandler = () => {
    let result = [];

    for (let i = 0; i < 8; i++) {
      result.push(
        <span key={i + 1} onClick={() => setNumberOfPeople(i + 1)}>
          {i + 1 <= numberOfPeople ? <FaUser className='number-of-people-icon active' /> : <FaUser className='number-of-people-icon' />}
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
