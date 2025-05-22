import React from 'react';
import './Room.style.scss';
import { useAccomSearchStore } from '../../../states';
import { GoCheckCircle, GoCheckCircleFill } from '../../../assets/icons/index';

const Room = ({ className, checkArea, value }) => {
  const { checkIn, checkOut, tripDay } = useAccomSearchStore((state) => state);
  return (
    <div className={className}>
      <div className='accom-name'>
        {checkArea && (
          <div>
            <span>
              <GoCheckCircle />
            </span>
          </div>
        )}
        <h1>{value.accom_name}</h1>
      </div>
      <div className='room-body'>
        <div className='room-image'>
          <img src='/assets/images/room-page/sample.png' />
        </div>
        <div className='room-info'>
          <h2>객실명</h2>
          <p>
            {checkIn} ~ {checkOut} ({tripDay}박)
          </p>
          <p className='room-price'>
            <span>3,000,000</span>원
          </p>
        </div>
      </div>
    </div>
  );
};

export default Room;
