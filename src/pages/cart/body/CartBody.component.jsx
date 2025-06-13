import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PayInfo from '../../../components/pay/PayInfo.component';
import Room from '../../../components/room-list/room/Room.component';
import { usePaymentInfoStore } from '../../../states';
import { GoCheckCircle } from '../../../assets/icons/index';
import { useAccomCartStore } from '../../../states/accom-cart/accomCartStore';
import { useQuery } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';
import { findCartByMemNo } from '../../../services/cart/cartService.api';
import './CartBody.style.scss';
import { loginStateStore } from '../../../states/login/loginStore';

const CartBody = ({ className }) => {
  const navigate = useNavigate();
  const roomInfo = usePaymentInfoStore((state) => state.roomInfo);
  const { setRoomInfo } = usePaymentInfoStore((state) => state.actions);
  const [_, setSelectedAll] = useState(false);

  const { selectedItems } = useAccomCartStore((state) => state);
  const memNo = loginStateStore((state) => state.loginInfo.memSq);

  // 장바구니 데이터 조회
  const { data, isLoading } = useQuery({
    queryKey: ['myCartList', memNo],
    queryFn: async () => {
      console.log(memNo);
      const { data, status } = await findCartByMemNo(memNo);

      if (status !== HttpStatusCode.Ok) {
        alert('데이터 조회 실패');
        navigate(-1);
      }

      console.log(data);

      return data ?? [];
    },
    staleTime: 1000 * 5,
  });

  // 전체 선택
  const checkAllHandler = () => {
    setRoomInfo(data);
    setSelectedAll(true);
  };

  // 전체 해제
  const checkAllClearHandler = () => {
    setRoomInfo([]);
    setSelectedAll(false);
  };

  // 하나 선택
  const checkHandler = (data) => {
    const exists = roomInfo.some((item) => item.roomNo === data.roomNo);
    if (exists) {
      setRoomInfo(roomInfo.filter((item) => item.roomNo !== data.roomNo));
    } else {
      setRoomInfo([...roomInfo, data]);
    }
  };

  const reserveHandler = () => {
    if (roomInfo.length === 0) {
      alert('선택된 숙소가 없습니다.');
      return;
    }
    navigate('/reservations', roomInfo);
  };

  useEffect(() => {
    console.log(memNo);
  }, []);

  return (
    <>
      <div className={className}>
        <div className='room-area__container'>
          <div className='all-check-area'>
            <span
              className='check-all__true'
              onClick={checkAllHandler}
            >
              <GoCheckCircle /> 전체선택
            </span>
            <span
              className='check-all__false'
              onClick={checkAllClearHandler}
            >
              전체해제
            </span>
          </div>
          {isLoading ? (
            <p>조회중...</p>
          ) : (
            <>
              {data.map((value, idx) => {
                // 배열 안의 요소를 판별하여 boolean 값 전달
                const isChecked = roomInfo.some(
                  (item) => item.roomNo === value.roomNo
                );
                return (
                  <Room
                    key={idx}
                    className='room-item'
                    value={value}
                    checkArea={true}
                    checkHandler={checkHandler}
                    isChecked={isChecked}
                  />
                );
              })}
            </>
          )}
        </div>
        <PayInfo
          className='cart-pay-area__container'
          roomInfo={roomInfo}
          clickHandler={reserveHandler}
        />
      </div>
    </>
  );
};

export default CartBody;
