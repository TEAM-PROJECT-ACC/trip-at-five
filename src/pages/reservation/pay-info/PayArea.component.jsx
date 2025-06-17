import Bootpay from '@bootpay/client-js';
import PayInfo from '../../../components/pay/PayInfo.component';
import Room from '../../../components/room-list/room/Room.component';
import { usePaymentInfoStore } from '../../../states';
import './PayArea.style.scss';
import { useMutation } from '@tanstack/react-query';
import {
  bootpayAPI,
  createOrderId,
  insertOrder,
  insertReservation,
  requestServerConfirm,
  updatePaymentStateAPI,
} from '../../../services/reservation/reservationService';
import { useNavigate } from 'react-router-dom';
import { getRoomInfo } from './utils/payData.util';
import { useEffect } from 'react';
import { HttpStatusCode } from 'axios';
import { loginStateStore } from '../../../states/login/loginStore';
import { toast } from 'react-toastify';
import { formatDateForApi } from '../../../utils/formatDate/formatDate';

const PayArea = ({ className, roomInfo }) => {
  const navigate = useNavigate();
  const { setResCode, setRoomInfo, setTotalPrice } = usePaymentInfoStore(
    (state) => state.actions
  );

  const paymentState = usePaymentInfoStore((state) => state);
  const memNo = loginStateStore((state) => state.loginInfo.memSq);

  // 주문 정보 저장 요청
  const { mutate: orderInfoMutation } = useMutation({
    mutationKey: ['order'],
    mutationFn: async (orderInfo) => {
      // 예약코드 목록 길이만큼 예약코드 - 주문ID, 영수증ID 를 한쌍으로 DB에 저장

      const { data } = await insertOrder(orderInfo);
      // console.log(data);

      return data;
    },
    onSuccess: async (data) => {
      // console.log(data);
      navigate(`/orders/${data}`);
    },
  });

  // 결제 승인 요청
  const { mutate: confirmMutation } = useMutation({
    mutationKey: ['payment'],
    mutationFn: async ({ payment, resCodeList }) => {
      // console.log('payment : ' + JSON.stringify(payment));
      const confirmInfo = {
        receiptId: payment.receipt_id,
        orderId: payment.order_id,
      };
      const { data, status } = await requestServerConfirm(confirmInfo); // 상태코드 반환

      if (status === HttpStatusCode.Ok) {
        await updatePaymentStateAPI(resCodeList);
      }

      const result = {
        resCodeList: { ...resCodeList },
        payment: { ...payment },
      };

      return result;
    },
    onSuccess: (data) => {
      // console.log('서버 승인 성공', data);
      // 결제창 닫고 결과 페이지로 이동 (URL에 receipt_id 전달)
      Bootpay.destroy();

      const orderInfo = {
        orderId: data.payment.order_id,
        receiptId: data.payment.receipt_id,
        resCode: Array.isArray(data.resCodeList)
          ? data.resCodeList
          : Object.values(data.resCodeList),
      };

      // 주문 테이블에 저장
      orderInfoMutation(orderInfo);
    },
    onError: (error) => {
      console.error('서버 승인 실패', error);
    },
  });

  // 예약
  const { mutate: resMutate } = useMutation({
    mutationKey: ['reservation', roomInfo],
    mutationFn: async ({ resInfo }) => {
      let message = '';
      if (!resInfo.paymentState.resEmail) {
        message = '이메일을 입력해주세요';
      } else if (!resInfo.paymentState.resName) {
        message = '예약자명을 입력해주세요';
      } else if (!resInfo.paymentState.resPhone) {
        message = '전화번호를 입력해주세요';
      }

      if (message !== '') {
        toast.error(message);
        return;
      }

      const insertResInfo = {
        resEmail: resInfo.paymentState.resEmail,
        resName: resInfo.paymentState.resName,
        resPhone: resInfo.paymentState.resPhone,
        resNumOfPeo: resInfo.paymentState.numberOfPeople,
        checkInDt: formatDateForApi(resInfo.paymentState.checkIn.slice(0, 10)),
        checkOutDt: formatDateForApi(
          resInfo.paymentState.checkOut.slice(0, 10)
        ),
        memNo,
      };

      // console.log('insertResInfo: ' + insertResInfo);

      // 예약 정보 저장 후 예약코드 목록 반환
      const { data } = await insertReservation(
        insertResInfo,
        paymentState.roomInfo
      );

      // console.log('resMutate : ' + data);

      const result = {
        data: { ...data },
        insertResInfo: { ...insertResInfo },
      };

      // console.log(result);

      return result;
    },
    onSuccess: (result) => {
      const totalPrice = usePaymentInfoStore.getState().totalPrice;
      // 주문 ID 생성 API 요청
      createOrderId(result.data).then(async (response) => {
        // console.log('res : ' + response);
        // 결제 요청 및 결제 정보 저장
        // console.log(paymentState.roomInfo);

        const items = getRoomInfo(paymentState.roomInfo, totalPrice);

        await bootpayAPI(result.insertResInfo, response, totalPrice, items)
          .then((response) => {
            if (response.event === 'confirm') {
              return confirmMutation({
                payment: response,
                resCodeList: result.data,
              }); // 서버 승인 요청
            }
          })
          .catch((e) => {
            console.error('결제 오류', e.message);
            switch (e.event) {
              case 'cancel':
                console.log('사용자가 결제 취소');
                break;
              case 'error':
                console.error('PG 오류 : ', e.message);
                break;
            }
            toast.error('결제 승인 실패. 다시 시도해주세요');
            navigate(-1);
          });
      });
    },
  });

  // 결제 버튼 클릭 핸들러
  const paymentHandler = async () => {
    /**
     * 1. 예약정보 저장 => OK
     * 2. 저장완료 후 예약코드 목록을 반환 => OK
     * 3. 주문 ID 생성 API 요청 후 반환된 주문ID 저장 => OK
     * 4. 주문ID와 함께 결제 요청 => OK
     * 5. 완료 시 주문 예약코드 목록과 영수증ID로 주문 테이블에 저장 API 요청 후 저장
     */

    resMutate({ resInfo: { paymentState } });
  };

  useEffect(() => {
    setRoomInfo(roomInfo);
  }, [roomInfo]);

  return (
    <>
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
    </>
  );
};

export default PayArea;
