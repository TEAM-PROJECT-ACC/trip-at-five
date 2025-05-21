import React from 'react';
import { ButtonPrimary, ButtonSecondary, InputShrink } from '../../../../components';
import './EmailForm.style.scss';

const EmailForm = ({ className }) => {
  return (
    <div className={className}>
      <h1>이메일 인증</h1>
      <form className='email-form__container'>
        <div className='email-form-item'>
          <InputShrink id='email' className='email-input' labelText='이메일을 입력해주세요' />
          {/* <input className='email-input' placeholder='이메일을 입력해주세요' /> */}
          <ButtonPrimary className='check-email-button' children='이메일 인증' />
        </div>
        <div className='email-form-item'>
          <InputShrink id='email-code' className='email-code-input' labelText='인증코드를 입력해주세요' />
          <ButtonSecondary className='check-email-button' children='확인' />
        </div>
      </form>
    </div>
  );
};

export default EmailForm;
