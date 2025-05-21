import React from 'react';
import { Link } from 'react-router-dom';
import './ReceiptArea.style.scss';
import PaymentInfo from './payment-info/PaymentInfo.component';
import ReceiptDetail from './receipt-detail/ReceiptDetail.component';

const ReceiptArea = () => {
  return (
    <div className='receipt-area__container'>
      <ReceiptDetail className='card__container' />
      <PaymentInfo className='card__container' />
      <button className='link-button--move'>
        <Link to='/'>메인페이지로 이동</Link>
      </button>
    </div>
  );
};

export default ReceiptArea;
