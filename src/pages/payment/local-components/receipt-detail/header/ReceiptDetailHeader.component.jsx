import React from 'react';
import './ReceiptDetailHeader.style.scss';
import { BsFillTelephoneFill, FaUser, IoReceipt } from '../../../../../assets/icons/index';

const ReceiptDetailHeader = ({ className }) => {
  return (
    <div className={className}>
      {/* 백엔드 연동 후 데이터 출력으로 변경할 부분 */}
      <h1 className='receipt-detail-header-item'>
        <IoReceipt />
        &nbsp;여행 다섯시 XXX님의 영수증
      </h1>
      <div className='receipt-detail-header-item'>
        <h3>
          <FaUser />
          &nbsp;예약자 : 임성준
        </h3>
        <h3>
          <BsFillTelephoneFill />
          &nbsp;연락처 : 010-1234-1234
        </h3>
      </div>
    </div>
  );
};

export default ReceiptDetailHeader;
