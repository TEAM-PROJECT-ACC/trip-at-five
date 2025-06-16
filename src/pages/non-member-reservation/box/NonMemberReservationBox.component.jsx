import { useState } from 'react';
import {
  ButtonPrimary,
  ButtonSecondary,
  InputShrink,
} from '../../../components';
import {
  sendEmailCode,
  verifyEmailCode,
} from '../../../services/nonMember/nonMember.api';
import { topCenterAlert } from '../../../utils/toastUtils/toastUtils';
import './NonMemberReservationBox.style.scss';

const NonMemberReservationBox = ({ className, onClick }) => {
  const [email, setEmail] = useState(() => '');
  const [isSentEmailCode, setIsSentEmailCode] = useState(() => false);
  const [emailCodeValue, setEmailCodeValue] = useState(() => '');
  const [isVerifiedEmail, setIsVerifiedEmail] = useState(() => false);
  const [resCd, setResCd] = useState(() => '');

  const onClickSelectReservation = () => {
    if (isVerifiedEmail && resCd && onClick) {
      onClick({ email, resCd });
    }
  };

  const onClickSendEmailVerifyCode = async () => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (isValidEmail) {
      const result = await sendEmailCode({ email });
      if (result === 'ok') {
        topCenterAlert('인증코드가 발송되었습니다.');
        setIsSentEmailCode(() => true);
      }
    } else {
      topCenterAlert('올바른 이메일을 입력해주세요.');
    }
  };

  const onClickVerifyEmail = async () => {
    if (isSentEmailCode) {
      const result = await verifyEmailCode({ email, code: emailCodeValue });
      if (result === 'sussess') {
        topCenterAlert('이메일 인증이 완료되었습니다.');
        setIsVerifiedEmail(() => true);
      } else {
        topCenterAlert('인증코드를 확인해 주세요.');
      }
    }
  };

  const handleEmailInput = (event) => {
    const targetValue = event.target.value;

    setEmail(() => targetValue);
  };

  const handleEmailCodeInput = (event) => {
    const targetValue = event.target.value;

    setEmailCodeValue(() => targetValue);
  };

  const handleReserveCodeInput = (event) => {
    const targetValue = event.target.value;

    setResCd(() => targetValue);
  };

  return (
    <div className={className}>
      <h1>비회원 예약 조회</h1>
      <div className='select-form__container'>
        <div className='form-item'>
          <InputShrink
            id='email-input'
            className='email-input'
            labelText={'이메일을 입력하세요'}
            defaultValue={email}
            onChange={handleEmailInput}
          />
          <ButtonPrimary
            type='button'
            className='email-check-button'
            children={'이메일인증'}
            onClick={onClickSendEmailVerifyCode}
          />
        </div>
        {isSentEmailCode && (
          <div className='form-item'>
            <InputShrink
              id='email-code-input'
              className='email-input'
              labelText={'인증코드를 입력하세요'}
              defaultValue={emailCodeValue}
              onChange={handleEmailCodeInput}
            />
            <ButtonSecondary
              type='button'
              className='email-check-button'
              children={'인증확인'}
              onClick={onClickVerifyEmail}
            />
          </div>
        )}
        {isVerifiedEmail && (
          <>
            <div className='form-item'>
              <InputShrink
                id='resCode-input'
                className='resCode-input'
                labelText={'예약코드를 입력하세요'}
                defaultValue={resCd}
                onChange={handleReserveCodeInput}
              />
            </div>
            <div className='form-item'>
              <p>언제든 편하게 물어보세요!</p>
              <ButtonPrimary
                type='button'
                className='select-button'
                children={'예약조회'}
                onClick={onClickSelectReservation}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NonMemberReservationBox;
