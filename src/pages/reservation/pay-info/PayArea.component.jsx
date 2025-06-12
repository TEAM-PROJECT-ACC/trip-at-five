import Bootpay from '@bootpay/client-js';
import PayInfo from '../../../components/pay/PayInfo.component';
import Room from '../../../components/room-list/room/Room.component';
import { usePaymentInfoStore } from '../../../states';
import './PayArea.style.scss';
import { useMutation } from '@tanstack/react-query';

import {
  VITE_BOOTPAY_KEY,
  VITE_RESERVATION_ORDER_METHOD,
  VITE_RESERVATION_ORDER_NAME,
  VITE_RESERVATION_ORDER_PG,
} from '../../../../env.config';
import {
  bootpayAPI,
  createResCodeAPI,
  requestServerConfirm,
} from '../../../services/reservation/reservationService';
import { useNavigate } from 'react-router-dom';
import { calcTotalPrice, getRoomInfo } from './utils/payData.util';
import { useEffect } from 'react';

const PayArea = ({ className, roomInfo }) => {
  const navigate = useNavigate();
  const { setResCode, setRoomInfo } = usePaymentInfoStore(
    (state) => state.actions
  );
  const paymentState = usePaymentInfoStore((state) => state);
  const memNo = 2; // 추후 회원번호 값

  // 결제 승인 요청
  const { mutate: confirmMutation } = useMutation({
    mutationKey: ['payment'],
    mutationFn: async (payment) => {
      console.log('payment : ' + payment);
      const { data } = await requestServerConfirm(payment); // 상태코드 반환

      return data;
    },
    onSuccess: (data, variables) => {
      console.log('서버 승인 성공', data);
      // 결제창 닫고 결과 페이지로 이동 (URL에 receipt_id 전달)
      Bootpay.destroy();
      navigate(`/result/${variables.receiptId}`);
    },
    onError: (error) => {
      console.error('서버 승인 실패', error);
    },
  });

  // 예약
  const { mutate: resMutate } = useMutation({
    mutationKey: ['resCode', roomInfo],
    mutationFn: async ({ resInfo }) => {
      let resUserInfo = {
        resEmail: resInfo.paymentState.resEmail,
        resName: resInfo.paymentState.resName,
        resPhone: resInfo.paymentState.resPhone,
      };

      const { data } = await createResCodeAPI(resUserInfo).then((res) => {
        setResCode(res.data);
        return res;
      });

      const { resCode } = await bootpayAPI(
        paymentState,
        resUserInfo,
        data,
        memNo
      );

      return resCode; // 예약코드 반환
    },
    onSuccess: async (data, variable, context) => {
      // console.log(variable);
      const { paymentState } = variable.resInfo;
      try {
        console.log(paymentState.roomInfo);

        const totalPrice = calcTotalPrice(paymentState.roomInfo);
        const items = getRoomInfo(paymentState.roomInfo);

        await Bootpay.requestPayment({
          application_id: VITE_BOOTPAY_KEY,
          price: totalPrice,
          order_name: VITE_RESERVATION_ORDER_NAME,
          order_id: data,
          pg: VITE_RESERVATION_ORDER_PG,
          method: VITE_RESERVATION_ORDER_METHOD,
          tax_free: 0,
          user: {
            id: memNo,
            username: paymentState.resName,
            phone: paymentState.resPhone,
            email: paymentState.resEmail,
          },
          items: items,
          extra: {
            open_type: 'iframe',
            card_quota: '0,2,3',
            escrow: false,
            separately_confirmed: true,
            display_error_result: true,
          },
        }).then((response) => {
          if (response.event === 'confirm') {
            confirmMutation(response); // 서버 승인 요청
          }
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

        navigate(-1);
      }
    },
  });

  const paymentHandler = async () => {
    // 서버에서 로직을 통해 예약코드 생성해서 넣을 예정

    // 예약코드 생성 API

    // console.log(state);
    resMutate({ resInfo: { paymentState } });

    /*
const resCode = 'testSeongJun';
    setResCode(resCode);

    console.log(state);

    
    */
  };

  useEffect(() => {
    setRoomInfo(roomInfo);
  }, []);

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
