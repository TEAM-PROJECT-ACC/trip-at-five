import { apiAxios } from '../service';

/**
 * 장바구니 추가
 * @param {*} memNo 회원번호
 * @param {*} cartItem 객실번호
 */
export const insertCartItem = async (cartInfo) => {
  // console.log(cartInfo);
  const response = apiAxios.post(`/carts`, cartInfo);

  return response;
};
