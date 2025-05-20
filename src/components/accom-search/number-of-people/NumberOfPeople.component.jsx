import React from 'react';
import { FaUser } from '../../../assets/icons/index';
import './NumberOfPeople.style.scss';

const NumberOfPeople = ({ ...props }) => {
  return (
    <div {...props}>
      <p className='number-of-people-icon-group'>
        <FaUser />
        <FaUser />
        <FaUser />
        <FaUser />
        <FaUser />
        <FaUser />
        <FaUser />
        <FaUser />
      </p>
    </div>
  );
};

export default NumberOfPeople;
