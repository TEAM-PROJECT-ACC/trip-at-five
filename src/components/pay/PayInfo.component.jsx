import React, { useEffect, useState } from 'react';
import './PayInfo.style.scss';
import { ButtonPrimary } from '..';
import { usePaymentInfoStore } from '../../states';

const PayInfo = ({ className, clickHandler, resState, selectedList }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    console.log(resState);
    console.log(selectedList);

    selectedList.map((value) => setTotalPrice(totalPrice + value.rooms[0].room_price));
  }, [resState, selectedList]);

  return (
    <div className={className}>
      <div className='pay-info'>
        <div className='pay-info-item'>
          <h2>결제 정보</h2>
          <ul>
            {selectedList.map((value, idx) => (
              <li key={idx}>
                <span>{value.rooms[0].room_name}</span>
                <span>
                  <span>{value.rooms[0].room_price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}</span>원
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className='pay-info-item'>
          <h2>총 결제 금액</h2>
          <h3>
            <span>{totalPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}</span>원
          </h3>
        </div>
        {/* 결제 버튼 텍스트 총 금액 표기하기 ex) 총금액 원 결제하기 */}
        <ButtonPrimary
          className='payment-button'
          children={`${totalPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}원 결제하기`}
          onClick={clickHandler}
        />
      </div>
    </div>
  );
};

export default PayInfo;
