import { useEffect, useState } from 'react';
import {
  ButtonPrimary,
  ButtonSecondary,
  InputShrink,
} from '../../../../components';
import { usePaymentInfoStore } from '../../../../states';
import './EmailForm.style.scss';
import {
  emailCodeCheck,
  sendEmailCode,
} from '../../../../services/register/apiService';
import { toast } from 'react-toastify';

/**
 * email input 의 기본값은 ''
 * 사용자가 회원일 경우 input의 value를 사용자 이메일로 설정
 *
 * 사용자가 비회원일 경우 input의 value를 ''로 설정
 *
 * 확인 버튼 클릭 이후
 * email 인증 성공 시 toast 메시지를 출력하고 email 값을 예약 상태관리 정보에 저장
 */
const EmailForm = ({ className, memEmail }) => {
  const { resEmail } = usePaymentInfoStore((state) => state);
  const { setResEmail } = usePaymentInfoStore((state) => state.actions);
  const [emailCode, setEmailCode] = useState();

  const checkEmailHandler = async () => {
    /*인증코드 보내기*/
    sendmailCode();
    toast.success('인증코드를 발송했습니다.');
  };

  const sendmailCode = async () => await sendEmailCode(memEmail);

  const checkEmailCodeHandler = async () => {
    const result = await emailCodeCheck(memEmail, emailCode);
    if (result.data !== 'sussess') {
      console.log(result);
      toast.warn('다시 인증해주세요');
    } else {
      setEmailState(true);
      toast.success('이메일 인증 성공');
    }
  };

  useEffect(() => {
    console.log(memEmail);
    if (memEmail) setResEmail(memEmail);
  }, []);

  useEffect(() => {
    console.log(resEmail);
  }, [resEmail]);

  return (
    <div className={className}>
      <h1>이메일 인증</h1>
      <form className='email-form__container'>
        <div className='email-form-item'>
          <InputShrink
            id='email'
            type='email'
            className='email-input'
            labelText={!memEmail ? '이메일을 입력해주세요' : memEmail}
            onChange={(e) => setResEmail(e.target.value)}
          />
          <ButtonPrimary
            type='button'
            className='check-email-button'
            children='이메일 인증'
            onClick={checkEmailHandler}
          />
        </div>
        <div className='email-form-item'>
          <InputShrink
            id='email-code'
            type='text'
            className='email-input'
            labelText='인증코드를 입력해주세요'
            onChange={(e) => {
              setEmailCode(e.target.value);
            }}
          />
          <ButtonSecondary
            type='button'
            className='check-email-button'
            children='확인'
            onClick={checkEmailCodeHandler}
          />
        </div>
      </form>
    </div>
  );
};

export default EmailForm;
