import { ButtonPrimary, Label } from '../../../components';
import { loginStateStore } from '../../../states/login/loginStore';
import { useNavigate } from 'react-router-dom';
import './NonMemberReservationList.style.scss';

const NonMemberReservationList = ({
  className,
  reservationList,
  nonMemberInfo,
}) => {
  const { setLoginInfo } = loginStateStore();
  const navigate = useNavigate();

  const onClickContact = () => {
    // 비회원 정보 임시 저장 - 1:1 문의 용도
    setLoginInfo({
      memEmailId: nonMemberInfo.email, // memEmailId: "k@naver.com"
      memNick: '비회원', // memNick: "여행다섯시"
      resCd: nonMemberInfo.resCd, // 비회원 예약 코드
      memSq: 0, // memSq: 1
      memType: 'non-m', // memType: "user"
    });

    navigate('/chat/room');
  };

  return (
    <div className={className}>
      <div className='non-m-reservation-list-title'>
        <h2>예약내역</h2>
      </div>

      <div className='non-m-reservation-list'>
        <ul>
          {reservationList.length > 0 ? (
            reservationList.map((reservationInfo, idx) => (
              <li
                key={idx}
                className='non-m-reservation-item__container'
              >
                <img src='/assets/images/room-page/sample.png' />
                <div className='non-m-reservation-item'>
                  <div className='non-m-reservation-info'>
                    <p>
                      <Label className='neutral'>예약상태</Label>
                    </p>
                    <h3>
                      {reservationInfo.accomInfo.accomName} -{' '}
                      {reservationInfo.roomInfo.roomName}
                    </h3>
                    <p>
                      {reservationInfo.item.resName} -{' '}
                      {reservationInfo.item.resPhone}
                    </p>
                    <p>
                      {reservationInfo.roomInfo.roomPrice.toLocaleString(
                        'ko-kr'
                      )}
                      원
                    </p>
                  </div>
                  <div className='button-area'>
                    <ButtonPrimary
                      className='inquiry-button'
                      children={'예약문의'}
                      onClick={onClickContact}
                    />
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className='no-data'>
              <span>조회된 내역이 없습니다.</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NonMemberReservationList;
