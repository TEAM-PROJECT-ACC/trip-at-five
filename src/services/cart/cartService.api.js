import { apiAxios } from '../service';

/**
 * 장바구니 추가
 * @param cartInfo : 추가할 항목
 */
export const insertCartItem = async (cartInfo) => {
  // console.log(cartInfo);
  const response = apiAxios.post(`/carts`, cartInfo);

  return response;
};

/**
 *
 * @param {*} cartInfo : 제거할 항목
 */
export const deleteCartItem = async (cartInfo) => {
  console.log('deleteCartItem : ' + cartInfo);
  const response = await apiAxios.delete(`/carts`, { data: cartInfo });

  return response;
};

/**
 * 장바구니 목록 조회
 * @param {*} memNo : 회원번호
 * @returns
 */
export const findCartByMemNo = async (memNo) => {
  console.log('memNo : ' + memNo);
  const response = await apiAxios.get(`/carts/${memNo}`);

  return response;
};
