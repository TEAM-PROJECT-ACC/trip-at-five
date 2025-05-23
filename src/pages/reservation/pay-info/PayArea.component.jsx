import React from 'react';
import './PayArea.style.scss';
import PayInfo from '../../../components/pay/PayInfo.component';
import Room from '../../../components/room-list/room/Room.component';
import { usePaymentInfoStore } from '../../../states';
import Bootpay from '@bootpay/client-js';

const PayArea = ({ className, roomInfo }) => {
  const { setResCode } = usePaymentInfoStore((state) => state.actions);
  const state = usePaymentInfoStore((state) => state);
  const paymentHandler = async () => {
    // 서버에서 로직을 통해 예약코드 생성해서 넣을 예정
    const resCode = 'testSeongJun';
    setResCode(resCode);

    console.log(state);

    try {
      // 추후 수정 예정
      const response = await Bootpay.requestPayment({
        application_id: '59a4d323396fa607cbe75de4',
        price: 1000,
        order_name: '테스트결제',
        order_id: 'TEST_ORDER_ID',
        pg: '다날',
        method: '카드',
        tax_free: 0,
        user: {
          id: '회원아이디',
          username: '회원이름',
          phone: '01000000000',
          email: 'test@test.com',
        },
        items: roomInfo,
        extra: {
          open_type: 'iframe',
          card_quota: '0,2,3',
          escrow: false,
        },
      });
    } catch (e) {
      console.log('결제 오류', e.message);
      switch (e.event) {
        case 'cancel':
          console.log('사용자가 결제 취소');
          break;
        case 'error':
          console.log('PG 오류 : ', e.message);
          break;
      }
    }
  };
  return (
    <div className={className}>
      <div className='room-area__container'>
        <ul>
          {roomInfo.map((value, idx) => (
            <li key={idx}>
              <Room className='room-item' checkArea={false} value={value} />
            </li>
          ))}
        </ul>
      </div>
      <PayInfo className='pay-area__container' clickHandler={paymentHandler} roomInfo={roomInfo} />
    </div>
  );
};

export default PayArea;
