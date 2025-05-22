import React, { useEffect } from 'react';
import './Room.style.scss';
import { useAccomSearchStore } from '../../../states';
import { GoCheckCircle, GoCheckCircleFill } from '../../../assets/icons/index';

const Room = ({ className, checkArea, value, checkHandler, isChecked }) => {
  const { checkIn, checkOut, tripDay } = useAccomSearchStore((state) => state);

  const checkRoomHandler = () => {
    checkHandler(value);
  };

  useEffect(() => {
    console.log(value);
  }, []);

  return (
    <div className={className}>
      <div className='accom-name'>
        {checkArea && <span onClick={checkRoomHandler}>{isChecked ? <GoCheckCircleFill /> : <GoCheckCircle />}</span>}
        <h1>{value.accom_name}</h1>
      </div>
      <div className='room-body'>
        <div className='room-image'>
          <img src='/assets/images/room-page/sample.png' />
        </div>
        <div className='room-info'>
          <h2>{value.rooms[0].room_name}</h2>
          <p>
            {checkIn} ~ {checkOut} ({tripDay}박)
          </p>
          <p className='room-price'>
            <span>{value.rooms[0].room_price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}</span>원
          </p>
        </div>
      </div>
    </div>
  );
};

export default Room;
