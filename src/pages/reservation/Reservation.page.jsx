import { useEffect } from 'react';
import UserInfo from './user-info/UserInfo.component';
import PayArea from './pay-info/PayArea.component';
import { PageContainer } from '../../components';
import { useAccomSearchStore, usePaymentInfoStore } from '../../states';
import './Reservation.style.scss';

const Reservation = () => {
  const checkIn = useAccomSearchStore((state) => state.checkIn);
  const checkOut = useAccomSearchStore((state) => state.checkOut);
  const numberOfPeople = useAccomSearchStore((state) => state.numberOfPeople);

  const { roomInfo } = usePaymentInfoStore((state) => state);

  const { setCheckIn, setCheckOut, setNumberOfPeople } = usePaymentInfoStore(
    (state) => state.actions
  );

  useEffect(() => {
    setCheckIn(checkIn);
    setCheckOut(checkOut);
    setNumberOfPeople(numberOfPeople);
  }, []);

  return (
    <PageContainer className='reservation__container'>
      <UserInfo className='user-info__container' />
      <PayArea
        className='pay-info__container'
        roomInfo={roomInfo}
      />
    </PageContainer>
  );
};

export default Reservation;
