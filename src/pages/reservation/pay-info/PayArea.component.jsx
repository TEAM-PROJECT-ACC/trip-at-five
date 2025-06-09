import Bootpay from '@bootpay/client-js';
import PayInfo from '../../../components/pay/PayInfo.component';
import Room from '../../../components/room-list/room/Room.component';
import { usePaymentInfoStore } from '../../../states';
import './PayArea.style.scss';
import { useMutation } from '@tanstack/react-query';
import { createResCodeAPI } from '../../../services/reservation/reservationService';
import { useEffect } from 'react';
import { VITE_BOOTPAY_KEY } from '../../../../env.config';

const PayArea = ({ className, roomInfo }) => {
  const { setResCode } = usePaymentInfoStore((state) => state.actions);
  const paymentState = usePaymentInfoStore((state) => state);

  const { mutate } = useMutation({
    mutationKey: ['resCode'],
    mutationFn: async ({ resInfo }) => {
      console.log(resInfo.paymentState);
      await createResCodeAPI(resInfo.paymentState)
        .then((res) => {
          setResCode(res.data);
          // return res; // return을 해줘야지 다음 then 구문에서 사용가능
        })
        .then(async (res) => {
          let totalPay = 0;
          // console.log(res.data); // 예약코드
          try {
            console.log(paymentState);

            // paymentState.roomInfo.map((value, idx) => totalPay += value.room[idx].)

            const response = await Bootpay.requestPayment({
              application_id: VITE_BOOTPAY_KEY,
              price: paymentState,
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
        });
    },
  });

  const paymentHandler = async () => {
    // 서버에서 로직을 통해 예약코드 생성해서 넣을 예정

    // 예약코드 생성 API

    // console.log(state);
    mutate({ resInfo: { paymentState } });

    /*
const resCode = 'testSeongJun';
    setResCode(resCode);

    console.log(state);

    
    */
  };

  // useEffect(() => {
  //   console.log(state);
  // }, [state]);

  return (
    <div className={className}>
      <div className='room-area__container'>
        <ul>
          {roomInfo.map((value, idx) => (
            <li key={idx}>
              <Room
                className='room-item'
                checkArea={false}
                value={value}
              />
            </li>
          ))}
        </ul>
      </div>
      <PayInfo
        className='pay-area__container'
        clickHandler={paymentHandler}
        roomInfo={roomInfo}
      />
    </div>
  );
};

export default PayArea;
