import React from 'react';
import Room from './room/Room.component';
import './RoomList.style.scss';

const RoomList = () => {
  return (
    <div className='room-list'>
      <Room className='room-item' />
      <Room className='room-item' />
      <Room className='room-item' />
    </div>
  );
};

export default RoomList;
