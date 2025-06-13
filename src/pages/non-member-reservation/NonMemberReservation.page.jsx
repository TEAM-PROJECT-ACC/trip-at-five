import { useEffect, useState } from 'react';
import { PageContainer } from '../../components';
import NonMemberReservationBox from './box/NonMemberReservationBox.component';
import NonMemberReservationList from './list/NonMemberReservationList.component';
import './NonMemberReservation.style.scss';
import ChatStateStore from '../chat/chatStore';

const NonMemberReservation = () => {
  const { setCategory } = ChatStateStore();
  const [nonMemberInfo, setNonMemberInfo] = useState(() => {
    return {
      email: '',
      reservationCode: '',
    };
  });
  // 비회원 채팅 관리 상태
  // 이메일, 예약 코드
  const selectReservationHandler = async ({ email, reservationCode }) => {
    // 버튼 클릭 시 비동기로 예약내역을 조회하여 배열에 저장 후 출력하기
    // const result = await

    setNonMemberInfo(() => {
      return {
        email,
        reservationCode,
      };
    });
  };

  useEffect(() => {
    setCategory({ value: 'RESERVE', label: '예약문의' });
  }, [setCategory]);

  return (
    <PageContainer>
      <div className='non-m-reservation__container'>
        <NonMemberReservationBox
          className='non-m-reservation-box__container'
          onClick={selectReservationHandler}
        />
        <NonMemberReservationList
          className='non-m-reservation-list__container'
          nonMemberInfo={nonMemberInfo}
        />
      </div>
    </PageContainer>
  );
};

export default NonMemberReservation;
