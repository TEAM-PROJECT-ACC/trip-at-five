import React from 'react';
import './PayInfo.style.scss';
import { ButtonPrimary } from '../../../../components';
import { usePaymentInfoStore } from '../../../../states';
import { createResCode } from '../../../../utils/res-code/createResCode';

const PayInfo = ({ className }) => {
  const state = usePaymentInfoStore((state) => state);

  const paymentHandler = () => {
    const resCode = createResCode();
    console.log(state);
  };

  return (
    <div className={className}>
      <div className='pay-info'>
        <div className='pay-info-item'>
          <h2>결제 정보</h2>
          <ul>
            <li>
              <span>객실명</span>
              <span>
                <span>3,000,000</span>원
              </span>
            </li>
            <li>
              <span>객실명</span>
              <span>
                <span>3,000,000</span>원
              </span>
            </li>
            <li>
              <span>객실명</span>
              <span>
                <span>3,000,000</span>원
              </span>
            </li>
          </ul>
        </div>

        <div className='pay-info-item'>
          <h2>총 결제 금액</h2>
          <h3>
            <span>9,000,000</span>원
          </h3>
        </div>
        {/* 결제 버튼 텍스트 총 금액 표기하기 ex) 총금액 원 결제하기 */}
        <ButtonPrimary className='payment-button' children='9,000,000원 결제하기' onClick={paymentHandler} />
      </div>
    </div>
  );
};

export default PayInfo;
