import { useEffect } from 'react';
import UserInfo from './user-info/UserInfo.component';
import PayArea from './pay-info/PayArea.component';
import { PageContainer } from '../../components';
import { useAccomSearchStore, usePaymentInfoStore } from '../../states';
import './Reservation.style.scss';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const Reservation = () => {
  const navigate = useNavigate();
  const checkIn = useAccomSearchStore((state) => state.checkIn);
  const checkOut = useAccomSearchStore((state) => state.checkOut);
  const numberOfPeople = useAccomSearchStore((state) => state.numberOfPeople);
  const { setCheckIn, setCheckOut, setNumberOfPeople } = usePaymentInfoStore(
    (state) => state.actions
  );

  const { roomInfo } = usePaymentInfoStore((state) => state);

  useEffect(() => {
    if (roomInfo.length === 0) {
      navigate(-1);
      return;
    }
    setCheckIn(checkIn);
    setCheckOut(checkOut);
    setNumberOfPeople(numberOfPeople);
  }, []);

  return (
    <PageContainer className='reservation__container'>
      <UserInfo className='user-info__container' />
      {roomInfo && (
        <PayArea
          className='pay-info__container'
          roomInfo={roomInfo}
        />
      )}
      <ToastContainer />
    </PageContainer>
  );
};

export default Reservation;
