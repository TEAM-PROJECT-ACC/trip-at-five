import React from 'react';
import ReservationPerson from './reservation-person/ReservationPerson.component';
import './UserInfo.style.scss';
import EmailForm from './email-form/EmailForm.component';

const UserInfo = ({ className }) => {
  return (
    <div className={className}>
      <EmailForm className='email-form-area__container' />
      <ReservationPerson className='reservation-person-info-form-area__container' />
    </div>
  );
};

export default UserInfo;
