import React from 'react';
import { accomData } from '../../../assets/sample-data/accomSampleData';
import { ButtonPrimary, Label } from '../../../components';
import './NonMemberReservationList.style.scss';

const dataList = accomData;

const NonMemberReservationList = ({ className }) => {
  return (
    <div className={className}>
      <div className='non-m-reservation-list-title'>
        <h2>예약내역</h2>
      </div>

      <div className='non-m-reservation-list'>
        <ul>
          <li className='no-data'>
            <span>조회된 내역이 없습니다.</span>
          </li>
          {dataList.accommodation_tb?.map((value, idx) => (
            <li
              key={idx}
              className='non-m-reservation-item__container'
            >
              <img src='/assets/images/room-page/sample.png' />
              <div className='non-m-reservation-item'>
                <div className='non-m-reservation-info'>
                  {/* 예약 상태, 숙박시설명, 객실정보, 예약정보 출력 */}
                  <p>
                    <Label className='neutral'>예약상태</Label>
                  </p>
                  <h3>
                    {value.accom_name} - {value.rooms[0].room_name}
                  </h3>
                  <p>예약자명 - 예약자전화번호</p>
                  <p>{value.rooms[0].room_price.toLocaleString('ko-kr')}원</p>
                </div>
                <div className='button-area'>
                  {/* 예약 문의 버튼 : 추후 채팅 문의 페이지로 이동 */}
                  <ButtonPrimary
                    className='inquiry-button'
                    children={'예약문의'}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NonMemberReservationList;
