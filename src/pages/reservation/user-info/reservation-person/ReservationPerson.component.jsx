import './ReservationPerson.style.scss';
import { InputShrink, Select } from '../../../../components';
import { usePaymentInfoStore } from '../../../../states';
import { useEffect } from 'react';

/**
 * 예약자 정보를 입력받고 해당 값을 예약 상태관리 정보에 저장
 */
const ReservationPerson = ({ className }) => {
  // 상태 정보
  const { resName, resPhone, userCoupon } = usePaymentInfoStore((state) => state);
  const { setResName, setResPhone, setUserCoupon } = usePaymentInfoStore((state) => state.actions);

  /**
   * coupon은 추후 데이터 서버에서 불러와서 출력할 예정
   */
  const couponList = [
    {
      label: '1만원권',
      value: 10000,
    },
    {
      label: '2만원권',
      value: 20000,
    },
    {
      label: '3만원권',
      value: 30000,
    },
    {
      label: '4만원권',
      value: 40000,
    },
    {
      label: '5만원권',
      value: 50000,
    },
  ];

  // coupon 값 저장 핸들러
  const couponHandler = (data) => {
    console.log(data);
    setUserCoupon(data);
  };

  // 상태 값 변경 확인
  useEffect(() => {
    console.log(resName);
    console.log(resPhone);
    console.log(userCoupon);
  }, [resName, resPhone, userCoupon]);

  return (
    <div className={className}>
      <h1>예약자 정보</h1>
      <div className='reservation-person-form__container'>
        <form className='reservation-person-form'>
          <div className='reservation-person-form-item'>
            <InputShrink
              id='userName'
              type='text'
              className='reservation-person-input'
              labelText='예약자명을 입력해주세요'
              onChange={(e) => {
                setResName(e.target.value);
              }}
            />
          </div>
          <div className='reservation-person-form-item'>
            <InputShrink
              id='userPhone'
              type='text'
              className='reservation-person-input'
              labelText='"-"없이 전화번호를 입력해주세요'
              onChange={(e) => {
                setResPhone(e.target.value);
              }}
            />
          </div>
          <div className='reservation-person-form-item'>
            <Select
              defaultOption={{ label: '쿠폰을 선택해주세요' }}
              className='reservation-person-form-select'
              optionList={couponList}
              onSelect={(data) => {
                couponHandler(data);
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReservationPerson;
