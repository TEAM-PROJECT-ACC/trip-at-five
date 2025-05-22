import React from 'react';
import './PayArea.style.scss';
import PayInfo from '../../../components/pay/PayInfo.component';
import Room from '../../../components/room-list/room/Room.component';

const PayArea = ({ className }) => {
  const paymentHandler = () => {
    const { setResCode } = usePaymentInfoStore((state) => state.actions);
    const resCode = '예약코드';
    setResCode(resCode);
  };
  return (
    <div className={className}>
      <div className='room-area__container'>
        <Room className='room-item' checkArea={false} />
      </div>
      <PayInfo className='pay-area__container' clickHandler={paymentHandler} />
    </div>
  );
};

export default PayArea;
