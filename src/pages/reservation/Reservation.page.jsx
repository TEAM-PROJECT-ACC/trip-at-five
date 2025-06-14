import { useEffect } from 'react';
import UserInfo from './user-info/UserInfo.component';
import PayArea from './pay-info/PayArea.component';
import { PageContainer } from '../../components';
import { useAccomSearchStore, usePaymentInfoStore } from '../../states';
import './Reservation.style.scss';
import { useNavigate } from 'react-router-dom';

const Reservation = () => {
  const navigate = useNavigate();
  const { checkIn, checkOut, numberOfPeople } = useAccomSearchStore(
    (state) => ({
      checkIn: state.checkIn,
      checkOut: state.checkOut,
      numberOfPeople: state.numberOfPeople,
    })
  );

  const setPaymentInfo = usePaymentInfoStore((state) => ({
    setCheckIn: state.actions.setCheckIn,
    setCheckOut: state.actions.setCheckOut,
    setNumberOfPeople: state.actions.setNumberOfPeople,
  }));

  const { roomInfo } = usePaymentInfoStore((state) => state);

  useEffect(() => {
    if (!checkIn || !checkOut || !numberOfPeople) {
      navigate(-1);
      return;
    }
    setPaymentInfo.setCheckIn(checkIn);
    setPaymentInfo.setCheckOut(checkOut);
    setPaymentInfo.setNumberOfPeople(numberOfPeople);
  }, [checkIn, checkOut, numberOfPeople]);

  return (
    <PageContainer className='reservation__container'>
      <UserInfo className='user-info__container' />
      {roomInfo && (
        <PayArea
          className='pay-info__container'
          roomInfo={roomInfo}
        />
      )}
    </PageContainer>
  );
};

export default Reservation;
