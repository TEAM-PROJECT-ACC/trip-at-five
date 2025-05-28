import React from 'react';
import {
  ButtonPrimary,
  ButtonSecondary,
  InputShrink,
} from '../../../components';
import './NonMemberReservationBox.style.scss';

const NonMemberReservationBox = ({ className, onClick }) => {
  return (
    <div className={className}>
      <h1>비회원 예약 조회</h1>
      <div className='select-form__container'>
        <div className='form-item'>
          <InputShrink
            id='email-input'
            className='email-input'
            labelText={'이메일을 입력하세요'}
          />
          <ButtonPrimary
            type='button'
            className='email-check-button'
            children={'이메일인증'}
          />
        </div>
        <div className='form-item'>
          <InputShrink
            id='email-code-input'
            className='email-input'
            labelText={'인증코드를 입력하세요'}
          />
          <ButtonSecondary
            type='button'
            className='email-check-button'
            children={'인증확인'}
          />
        </div>
        <div className='form-item'>
          <InputShrink
            id='resCode-input'
            className='resCode-input'
            labelText={'예약코드를 입력하세요'}
          />
        </div>
        <div className='form-item'>
          <p>언제든 편하게 물어보세요!</p>
          <ButtonPrimary
            type='button'
            className='select-button'
            children={'예약조회'}
            onClick={onClick}
          />
        </div>
      </div>
    </div>
  );
};

export default NonMemberReservationBox;
