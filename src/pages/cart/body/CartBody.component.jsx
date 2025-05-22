import React, { useEffect, useState } from 'react';
import { GoCheckCircle, GoCheckCircleFill } from '../../../assets/icons/index';
import PayInfo from '../../../components/pay/PayInfo.component';
import './CartBody.style.scss';
import { usePaymentInfoStore } from '../../../states';
import Room from '../../../components/room-list/room/Room.component';
import { accomData } from '../../../assets/sample-data/accomData';

const accomDataList = accomData.accommodation_tb;

const CartBody = ({ className }) => {
  const state = usePaymentInfoStore((state) => state);
  const [selectedAll, setSelectedAll] = useState(false);

  const [checkList, setCheckList] = useState([]);

  // 전체 선택
  const checkAllHandler = () => {
    if (selectedAll) return;
    const roomAllList = document.querySelectorAll('.room-item');
    setCheckList([...checkList, roomAllList]);
    setSelectedAll(true);
  };

  // 전체 해제
  const checkAllClearHandler = () => {
    setCheckList([]);
  };

  // 하나 선택
  const checkHandler = (data) => {
    setCheckList(...checkList, data);
  };

  const reserveHandler = () => {};

  useEffect(() => {
    console.log(accomDataList);
    console.log(checkList);
  }, [checkList]);

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
          {accomDataList?.map((value, idx) => (
            <Room key={idx} className='room-item' value={value} checkArea={true} />
          ))}
        </div>
        <PayInfo className='cart-pay-area__container' clickHandler={reserveHandler} />
      </div>
    </>
  );
};

export default CartBody;
