import React, { useEffect, useState } from 'react';
import './PayInfo.style.scss';
import { ButtonPrimary } from '..';

const PayInfo = ({ className, clickHandler, resState, roomInfo }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    // console.log(resState);
    console.log(roomInfo);
    let total = 0;
    roomInfo?.map((value) => {
      // console.log(totalPrice);
      // console.log(value.rooms[0].room_price);
      // totalPrice += value.rooms[0].room_price;
      total += value.rooms[0].room_price;
    });
    setTotalPrice(total);
  }, [resState, roomInfo]);

  return (
    <div className={className}>
      <div className='pay-info'>
        <div className='pay-info-item'>
          <h2>결제 정보</h2>
          <ul>
            {roomInfo?.map((value, idx) => (
              <li key={idx}>
                <span>{value.rooms[0].room_name}</span>
                <span>
                  <span>
                    {value.rooms[0].room_price.toLocaleString('ko-KR')}
                  </span>
                  원
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className='pay-info-item'>
          <h2>총 결제 금액</h2>
          <h3>
            <span>{totalPrice.toLocaleString('ko-KR')}</span>원
          </h3>
        </div>
        {/* 결제 버튼 텍스트 총 금액 표기하기 ex) 총금액 원 결제하기 */}
        <ButtonPrimary
          className='payment-button'
          children={`${totalPrice.toLocaleString('ko-KR')}원 결제하기`}
          onClick={clickHandler}
        />
      </div>
    </div>
  );
};

export default PayInfo;
