import React from 'react';
import './ReservationPerson.style.scss';
import { SelectButton } from '../../../../components/select/components/select-button/SelectButton.component';
import { DropDown } from '../../../../components/select/components/drop-down/Dropdown.component';
import { Select } from '../../../../components';

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
  ];
  return (
    <div className={className}>
      <h1>예약자 정보</h1>
      <div>
        <form className='reservation-person-form__container'>
          <div className='reservation-person-form-item'>
            {/* <InputShrink className='email-input' labelText='이메일을 입력해주세요' /> */}
            <input className='reservation-person-input' placeholder='이메일을 입력해주세요' />
          </div>
          <div className='reservation-person-form-item'>
            <input className='reservation-person-input' placeholder='인증코드를 입력해주세요' />
          </div>
          <div className='reservation-person-form-item'>
            <Select className='reservation-person-form-select' optionList={couponList} />
          </div>
        </form>
        <div className='reservation-person-image'></div>
      </div>
    </div>
  );
};

export default ReservationPerson;
