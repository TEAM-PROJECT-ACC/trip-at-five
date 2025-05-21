import React from 'react';
import PayInfo from './pay/PayInfo.component';
import RoomList from './room-list/RoomList.component';
import './PayArea.style.scss';

const PayArea = ({ className }) => {
  return (
    <div className={className}>
      <RoomList className='room-area__container' />
      <PayInfo className='pay-area__container' />
    </div>
  );
};

export default PayArea;
