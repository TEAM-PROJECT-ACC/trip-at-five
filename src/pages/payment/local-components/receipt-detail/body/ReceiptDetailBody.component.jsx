import React from 'react';
import './ReceiptDetailBody.style.scss';
import { FaInfoCircle } from '../../../../../assets/icons/index';

const ReceiptDetailBody = ({ className }) => {
  return (
    <div className={className}>
      <h2 className='receipt-detail-body-item'>
        <FaInfoCircle />
        &nbsp;예약 정보
      </h2>
      <div className='reservation-info__container'>
        <div className='reservation-info-item'>
          <div className='accom-name'>
            <h3>숙박 시설 정보</h3>
          </div>
          <div className='room-name-list'>
            <div className='room-name-item'>
              <p>예약코드</p>
              <p>객실명</p>
              <p>예약일정</p>
              <p>가격</p>
            </div>
            <div className='room-name-item'>
              <p>예약코드</p>
              <p>객실명</p>
              <p>예약일정</p>
              <p>가격</p>
            </div>
          </div>
        </div>
        <div className='reservation-info-item'>
          <div className='accom-name'>
            <h3>숙박 시설 정보</h3>
          </div>
          <div className='room-name-list'>
            <div className='room-name-item'>
              <p>예약코드</p>
              <p>객실명</p>
              <p>예약일정</p>
              <p>가격</p>
            </div>
          </div>
        </div>
        <div className='reservation-info-item'>
          <div className='accom-name'>
            <h3>숙박 시설 정보</h3>
          </div>
          <div className='room-name-list'>
            <div className='room-name-item'>
              <p>예약코드</p>
              <p>객실명</p>
              <p>예약일정</p>
              <p>가격</p>
            </div>
            <div className='room-name-item'>
              <p>예약코드</p>
              <p>객실명</p>
              <p>예약일정</p>
              <p>가격</p>
            </div>
            <div className='room-name-item'>
              <p>예약코드</p>
              <p>객실명</p>
              <p>예약일정</p>
              <p>가격</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptDetailBody;
