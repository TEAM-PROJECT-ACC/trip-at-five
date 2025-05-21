import React from 'react';
import UserInfo from './user-info/UserInfo.component';
import './Reservation.style.scss';
import PayArea from './pay-info/PayArea.component';

const Reservation = () => {
  return (
    <div className='reservation__container'>
      <UserInfo className='user-info__container' />
      <PayArea className='pay-info__container' />
    </div>
  );
};

export default Reservation;
