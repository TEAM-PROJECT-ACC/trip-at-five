import React from 'react';
import UserInfo from './user-info/UserInfo.component';
import PayInfo from './pay-info/PayInfo.component';
import './Reservation.style.scss';

const Reservation = () => {
  return (
    <div className='reservation__container'>
      <UserInfo className='user-info__container' />
      <PayInfo className='pay-info__container' />
    </div>
  );
};

export default Reservation;
