import Bootpay from '@bootpay/client-js';
import {
  VITE_BOOTPAY_KEY,
  VITE_RESERVATION_ORDER_METHOD,
  VITE_RESERVATION_ORDER_NAME,
  VITE_RESERVATION_ORDER_PG,
} from '../../../env.config';
import { apiAxios } from '../service';

export const createOrderId = async (resCodeObj) => {
  const resCodeList = {
    resCodeList: Object.values(resCodeObj), // 배열로 변환
  };

  // console.log('resCodeList:', resCodeList);

  const response = await apiAxios.post('/reservations/order-id', resCodeList, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // console.log('createOrderId : ' + response.data);

  return response.data;
};

// 사용자 예약 정보 저장
export const insertReservation = async (insertResInfo, roomInfo) => {
  // console.log('insertReservation : ' + JSON.stringify(insertResInfo));
  // console.log('insertReservation1 : ' + JSON.stringify(roomInfo));

  const roomNoList = roomInfo.map((value, idx) => value.roomNo);
  // console.log('insertReservation2 : ' + roomNoList);

  insertResInfo = {
    ...insertResInfo,
    roomInfo: roomNoList,
  };

  const response = await apiAxios.post('/reservations', insertResInfo);

  return response;
};

export const bootpayAPI = async (insertResInfo, orderId, totalPrice, items) => {
  // console.log(insertResInfo, orderId, totalPrice, items);
  const response = await Bootpay.requestPayment({
    application_id: VITE_BOOTPAY_KEY,
    price: totalPrice,
    order_name: VITE_RESERVATION_ORDER_NAME,
    order_id: orderId,
    pg: VITE_RESERVATION_ORDER_PG,
    method: VITE_RESERVATION_ORDER_METHOD,
    tax_free: 0,
    user: {
      id: insertResInfo.memNo,
      username: insertResInfo.resName,
      phone: insertResInfo.resPhone,
      email: insertResInfo.resEmail,
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

  // console.log('bootpayAPI: ' + response.data);
  return response;
};

// 서버 승인 요청
export const requestServerConfirm = async (payment) => {
  // console.log('payment : ' + JSON.stringify(payment));

  const response = await apiAxios.post('/payments/confirm', payment);

  return response;
};

/**
 * 주문 테이블에 저장
 * @param {*} orderInfo
 * @returns
 */
export const insertOrder = async (orderInfo) => {
  // console.log(JSON.stringify(orderInfo));

  const response = await apiAxios.post('/orders', orderInfo);

  return response;
};

/**
 * 영수증 아이디로 결제 정보 불러오기
 * @param {*} receiptId
 * @returns
 */
export const orderResultAPI = async (receiptId) => {
  const response = await apiAxios.get(`/orders/${receiptId}`);

  return response;
};
