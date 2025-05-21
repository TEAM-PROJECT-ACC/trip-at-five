import React from 'react';
import ReceiptDetailHeader from './header/ReceiptDetailHeader.component';
import ReceiptDetailBody from './body/ReceiptDetailBody.component';
import './ReceiptDetail.style.scss';

const ReceiptDetail = ({ ...props }) => {
  return (
    <div {...props}>
      <ReceiptDetailHeader className='receipt-detail-header' />
      <ReceiptDetailBody className='receipt-detail-info' />
    </div>
  );
};

export default ReceiptDetail;
