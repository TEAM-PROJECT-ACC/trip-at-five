import React from 'react';
import './ReservationPerson.style.scss';
import { SelectButton } from '../../../../components/select/components/select-button/SelectButton.component';
import { DropDown } from '../../../../components/select/components/drop-down/Dropdown.component';
import { InputShrink, Select } from '../../../../components';

const ReservationPerson = ({ className }) => {
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
  return (
    <div className={className}>
      <h1>예약자 정보</h1>
      <div className='reservation-person-form__container'>
        <form className='reservation-person-form'>
          <div className='reservation-person-form-item'>
            <InputShrink id='userName' className='reservation-person-input' labelText='예약자명을 입력해주세요' />
            {/* <input className='reservation-person-input' placeholder='이메일을 입력해주세요' /> */}
          </div>
          <div className='reservation-person-form-item'>
            <InputShrink id='userPhone' className='reservation-person-input' labelText='"-"없이 전화번호를 입력해주세요' />
          </div>
          <div className='reservation-person-form-item'>
            <Select defaultOption={{ label: '쿠폰을 선택해주세요' }} className='reservation-person-form-select' optionList={couponList} />
          </div>
        </form>
        {/* <div className='reservation-person-image'>
          <img src={'/assets/images/reservation-page/reservation-form-img.webp'} />
        </div> */}
      </div>
    </div>
  );
};

export default ReservationPerson;
