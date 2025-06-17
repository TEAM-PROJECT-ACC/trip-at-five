import { ButtonSecondary } from '../../../../../../../components';
import { emailCodeCheck } from '../../../../../../../services/common/commonService';
import { useUserInfoUpdateStore } from '../../../../../../../states/user/userStore';
import {
  errorAlert,
  infoAlert,
  successAlert,
} from '../../../../../../../utils/toastUtils/toastUtils';
import { ContentsRow, InfoInput, InfoInputLabel } from '../../index';

export const AuthEmailCodeInput = () => {
  const { email, emailCode, setEmailCode, setIsEmailCodeCheckeTrue } =
    useUserInfoUpdateStore();

  const sendEmailCode = async () => {
    const result = await emailCodeCheck(email, emailCode);
    if (result.status === 200) {
      if (result.data === 'sussess') {
        successAlert('인증 성공');
        setIsEmailCodeCheckeTrue();
      } else {
        errorAlert('인증 실패.');
        infoAlert('인증코드를 확인해주세요');
      }
    }
  };

  return (
    <ContentsRow>
      <InfoInputLabel>인증번호</InfoInputLabel>
      <InfoInput
        placeholder={'인증번호를 입력해주세요'}
        onChange={(e) => {
          setEmailCode(e);
        }}
        value={emailCode}
      >
        <ButtonSecondary
          className='input__button'
          onClick={sendEmailCode}
        >
          인증하기
        </ButtonSecondary>
      </InfoInput>
    </ContentsRow>
  );
};
