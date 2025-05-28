import React from 'react';
import { PageContainer } from '../../components';
import './NonMemberReservation.style.scss';
import NonMemberReservationBox from './box/NonMemberReservationBox.component';
import NonMemberReservationList from './list/NonMemberReservationList.component';

const NonMemberReservation = () => {
  const selectReservationHandler = async () => {
    // 버튼 클릭 시 비동기로 예약내역을 조회하여 배열에 저장 후 출력하기
    // const result = await
  };

  return (
    <PageContainer>
      <div className='non-m-reservation__container'>
        <NonMemberReservationBox
          className='non-m-reservation-box__container'
          onClick={selectReservationHandler}
        />
        <NonMemberReservationList className='non-m-reservation-list__container' />
      </div>
    </PageContainer>
  );
};

export default NonMemberReservation;
