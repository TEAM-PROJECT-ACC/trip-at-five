import PaymentInfo from './payment-info/PaymentInfo.component';
import ReceiptDetail from './receipt-detail/ReceiptDetail.component';
import { LinkButton } from '../../../components';
import './ReceiptArea.style.scss';
import { useEffect, useState } from 'react';

const ReceiptArea = ({ orderInfo }) => {
  return (
    <>
      {orderInfo && (
        <div className='receipt-area__container'>
          <ReceiptDetail
            className='card__container'
            orderInfo={orderInfo}
          />
          <PaymentInfo
            className='card__container'
            payInfo={orderInfo.payInfo}
          />
          <LinkButton
            className='link-button--move'
            to='/'
            children={'메인페이지로 이동'}
          />
        </div>
      )}
    </>
  );
};

export default ReceiptArea;
