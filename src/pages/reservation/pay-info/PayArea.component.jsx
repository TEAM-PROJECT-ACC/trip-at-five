import Bootpay from '@bootpay/client-js';
import PayInfo from '../../../components/pay/PayInfo.component';
import Room from '../../../components/room-list/room/Room.component';
import { usePaymentInfoStore } from '../../../states';
import './PayArea.style.scss';
import { useMutation } from '@tanstack/react-query';

import { VITE_BOOTPAY_KEY } from '../../../../env.config';
import { createResCodeAPI } from '../../../services/reservation/reservationService';
import { useNavigate } from 'react-router-dom';

const PayArea = ({ className, roomInfo }) => {
  const navigate = useNavigate();
  const { setResCode } = usePaymentInfoStore((state) => state.actions);
  const paymentState = usePaymentInfoStore((state) => state);
  const memNo = 2; // 추후 회원번호 값

  const { mutate: resMutate } = useMutation({
    mutationKey: ['resCode', roomInfo],
    mutationFn: async ({ resInfo }) => {
      const resUserInfo = {
        resEmail: resInfo.paymentState.resEmail,
        resName: resInfo.paymentState.resName,
        resPhone: resInfo.paymentState.resPhone,
      };

      const { data } = await createResCodeAPI(resUserInfo).then((res) => {
        setResCode(res.data);
        return res;
      });

      return data;
    },
    onSuccess: async (data, variable, context) => {
      // console.log(variable);
      const { paymentState } = variable.resInfo;
      let totalPay = 0;
      try {
        paymentState.roomInfo.map(
          (value, idx) => (totalPay += value.roomPrice)
        );
        // console.log(totalPay);
        console.log(paymentState.roomInfo);

        const items = paymentState.roomInfo.map((value, idx) => {
          return {
            id: value.roomNo,
            name: `${value.accomName} - ${value.roomName}`,
            qty: 1,
            price: value.roomPrice,
          };
        });

        const response = await Bootpay.requestPayment({
          application_id: VITE_BOOTPAY_KEY,
          price: totalPay,
          order_name: '여행다섯시 예약',
          order_id: data,
          pg: '이니시스',
          method: '카드',
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
