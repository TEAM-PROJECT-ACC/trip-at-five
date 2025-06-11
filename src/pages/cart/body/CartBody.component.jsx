import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PayInfo from '../../../components/pay/PayInfo.component';
import Room from '../../../components/room-list/room/Room.component';
import { usePaymentInfoStore } from '../../../states';
import { accomData } from '../../../assets/sample-data/accomSampleData';
import { GoCheckCircle } from '../../../assets/icons/index';
import './CartBody.style.scss';
import { useAccomCartStore } from '../../../states/accom-cart/accomCartStore';

const accomDataList = accomData.accommodation_tb;

const CartBody = ({ className }) => {
  const navigate = useNavigate();
  const roomInfo = usePaymentInfoStore((state) => state.roomInfo);
  const { setRoomInfo } = usePaymentInfoStore((state) => state.actions);
  const [setSelectedAll] = useState(false);

  const { selectedItems } = useAccomCartStore((state) => state);

  // 전체 선택
  const checkAllHandler = () => {
    setRoomInfo(accomDataList);
    setSelectedAll(true);
  };

  // 전체 해제
  const checkAllClearHandler = () => {
    setRoomInfo([]);
    setSelectedAll(false);
  };

  // 하나 선택
  const checkHandler = (data) => {
    const exists = roomInfo.some((item) => item.accom_sq === data.accom_sq);
    if (exists) {
      setRoomInfo(roomInfo.filter((item) => item.accom_sq !== data.accom_sq));
    } else {
      setRoomInfo([...roomInfo, data]);
    }
  };

  const reserveHandler = () => {
    if (roomInfo.length === 0) {
      alert('선택된 숙소가 없습니다.');
      return;
    }
    navigate('/reservations', roomInfo);
  };

  useEffect(() => {
    console.log(selectedItems);
  }, []);

  return (
    <>
      <div className={className}>
        <div className='room-area__container'>
          <div className='all-check-area'>
            <span
              className='check-all__true'
              onClick={checkAllHandler}
            >
              <GoCheckCircle /> 전체선택
            </span>
            <span
              className='check-all__false'
              onClick={checkAllClearHandler}
            >
              전체해제
            </span>
          </div>
          {accomDataList?.map((value, idx) => {
            // 배열 안의 요소를 판별하여 boolean 값 전달
            const isChecked = roomInfo.some(
              (item) => item.accom_sq === value.accom_sq
            );
            return (
              <Room
                key={idx}
                className='room-item'
                value={value}
                checkArea={true}
                checkHandler={checkHandler}
                isChecked={isChecked}
              />
            );
          })}
        </div>
        <PayInfo
          className='cart-pay-area__container'
          roomInfo={roomInfo}
          clickHandler={reserveHandler}
        />
      </div>
    </>
  );
};

export default CartBody;
