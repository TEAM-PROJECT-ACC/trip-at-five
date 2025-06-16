import { useEffect, useState } from 'react';
import { PageContainer } from '../../components';
import NonMemberReservationBox from './box/NonMemberReservationBox.component';
import NonMemberReservationList from './list/NonMemberReservationList.component';
import './NonMemberReservation.style.scss';
import ChatStateStore from '../chat/chatStore';
import { selectNonMemberReserve } from '../../services/nonMember/nonMember.api';

const NonMemberReservation = () => {
  const [reservationList, setReservationList] = useState(() => []);
  const { setCategory } = ChatStateStore();
  const [nonMemberInfo, setNonMemberInfo] = useState(() => {
    return {
      email: '',
      resCd: '',
    };
  });
  // 비회원 채팅 관리 상태
  // 이메일, 예약 코드
  const selectReservationHandler = async ({ email, resCd }) => {
    // 버튼 클릭 시 비동기로 예약내역을 조회하여 배열에 저장 후 출력하기
    const data = await selectNonMemberReserve({ resCd });
    if (data) {
      setReservationList((prev) => [...prev, data]);
      setNonMemberInfo(() => {
        return {
          email,
          resCd,
        };
      });
    }
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
          reservationList={reservationList}
          nonMemberInfo={nonMemberInfo}
        />
      </div>
    </PageContainer>
  );
};

export default NonMemberReservation;
