import React, { useEffect } from 'react';
import UserInfo from './user-info/UserInfo.component';
import './Reservation.style.scss';
import PayArea from './pay-info/PayArea.component';
import { useAccomSearchStore, usePaymentInfoStore } from '../../states';
import { PageContainer } from '../../components';

const Reservation = () => {
  const checkIn = useAccomSearchStore((state) => state.checkIn);
  const checkOut = useAccomSearchStore((state) => state.checkOut);
  const numberOfPeople = useAccomSearchStore((state) => state.numberOfPeople);

  const { roomInfo } = usePaymentInfoStore((state) => state);

  const { setCheckIn, setCheckOut, setNumberOfPeople } = usePaymentInfoStore((state) => state.actions);

  useEffect(() => {
    console.log(checkIn);
    console.log(checkOut);
    console.log(numberOfPeople);
    setCheckIn(checkIn);
    setCheckOut(checkOut);
    setNumberOfPeople(numberOfPeople);
  }, []);

  return (
    <PageContainer className='reservation__container'>
      <UserInfo className='user-info__container' />
      <PayArea className='pay-info__container' roomInfo={roomInfo} />
    </PageContainer>
  );
};

export default Reservation;
