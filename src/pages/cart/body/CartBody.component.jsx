import React, { useEffect, useState } from 'react';
import { GoCheckCircle, GoCheckCircleFill } from '../../../assets/icons/index';
import PayInfo from '../../../components/pay/PayInfo.component';
import './CartBody.style.scss';
import { usePaymentInfoStore } from '../../../states';
import Room from '../../../components/room-list/room/Room.component';
import { accomData } from '../../../assets/sample-data/accomSampleData';

const accomDataList = accomData.accommodation_tb;

const CartBody = ({ className }) => {
  const roomInfo = usePaymentInfoStore((state) => state.roomInfo);
  const { setRoomInfo } = usePaymentInfoStore((state) => state.actions);
  const [selectedAll, setSelectedAll] = useState(false);

  const [selectedList, setSelectedList] = useState([]);

  // 전체 선택
  const checkAllHandler = () => {
    setSelectedList(accomDataList);
    setSelectedAll(true);
  };

  // 전체 해제
  const checkAllClearHandler = () => {
    setSelectedList([]);
    setSelectedAll(false);
  };

  // 하나 선택
  const checkHandler = (data) => {
    const exists = selectedList.some((item) => item.accom_sq === data.accom_sq);
    if (exists) {
      setSelectedList(selectedList.filter((item) => item.accom_sq !== data.accom_sq));
    } else {
      setSelectedList([...selectedList, data]);
    }
  };

  const reserveHandler = () => {
    if (selectedList.length === 0) {
      alert('선택된 숙소가 없습니다.');
      return;
    }

    setRoomInfo(selectedList);

    console.log('예약할 숙소:', roomInfo);
    // 상태 저장 후 페이지 이동 또는 결제 API 호출 등
  };

  useEffect(() => {
    // console.log(accomDataList);
    // console.log(selectedList);
    console.log(roomInfo);
  }, [roomInfo]);

  return (
    <>
      <div className={className}>
        <div className='room-area__container'>
          <div className='all-check-area'>
            <span className='check-all__true' onClick={checkAllHandler}>
              <GoCheckCircle /> 전체선택
            </span>
            <span className='check-all__false' onClick={checkAllClearHandler}>
              전체해제
            </span>
          </div>
          {accomDataList?.map((value, idx) => {
            // 배열 안의 요소를 판별하여 boolean 값 전달
            const isChecked = selectedList.some((item) => item.accom_sq === value.accom_sq);
            return <Room key={idx} className='room-item' value={value} checkArea={true} checkHandler={checkHandler} isChecked={isChecked} />;
          })}
        </div>
        <PayInfo className='cart-pay-area__container' selectedList={selectedList} clickHandler={reserveHandler} />
      </div>
    </>
  );
};

export default CartBody;
