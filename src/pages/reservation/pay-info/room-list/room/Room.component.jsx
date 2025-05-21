import React from 'react';
import { useAccomSearchStore } from '../../../../../states/accom-search/accomSearchStore';
import './Room.style.scss';
const Room = ({ className }) => {
  const { checkIn, checkOut, tripDay } = useAccomSearchStore((state) => state);
  return (
    <div className={className}>
      <div className='room-image'>
        <img src='/assets/images/room-page/sample.png' />
      </div>
      <div className='room-info'>
        <h1>객실명</h1>
        <p>
          {checkIn} ~ {checkOut} ({tripDay}박)
        </p>
        <p className='room-price'>
          <span>3,000,000</span>원
        </p>
      </div>
    </div>
  );
};

export default Room;
