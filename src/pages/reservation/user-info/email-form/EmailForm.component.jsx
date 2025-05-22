import React from 'react';
import { ButtonPrimary, ButtonSecondary, InputShrink } from '../../../../components';
import './EmailForm.style.scss';

const EmailForm = ({ className }) => {
  /**
   * email input 의 기본값은 ''
   * 사용자가 회원일 경우 input의 value를 사용자 이메일로 설정
   *
   * 사용자가 비회원일 경우 input의 value를 ''로 설정
   *
   * 확인 버튼 클릭 이후
   * email 인증 성공 시 toast 메시지를 출력하고 email 값을 예약 상태관리 정보에 저장
   */
  return (
    <div className={className}>
      <h1>이메일 인증</h1>
      <form className='email-form__container'>
        <div className='email-form-item'>
          <InputShrink id='email' type='email' className='email-input' labelText='이메일을 입력해주세요' />
          {/* <input className='email-input' placeholder='이메일을 입력해주세요' /> */}
          <ButtonPrimary className='check-email-button' children='이메일 인증' />
        </div>
        <div className='email-form-item'>
          <InputShrink id='email-code' type='text' className='email-input' labelText='인증코드를 입력해주세요' />
          <ButtonSecondary className='check-email-button' children='확인' />
        </div>
      </form>
    </div>
  );
};

export default EmailForm;
