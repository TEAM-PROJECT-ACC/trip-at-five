import ReceiptDetailHeader from './header/ReceiptDetailHeader.component';
import ReceiptDetailBody from './body/ReceiptDetailBody.component';
import './ReceiptDetail.style.scss';
import { useEffect } from 'react';

const ReceiptDetail = ({ orderInfo, ...props }) => {
  return (
    <div {...props}>
      <ReceiptDetailHeader
        className='receipt-detail-header'
        resUserInfo={orderInfo.resUserInfo}
      />
      <ReceiptDetailBody
        className='receipt-detail-info'
        resInfo={orderInfo.resInfo}
      />
    </div>
  );
};

export default ReceiptDetail;
