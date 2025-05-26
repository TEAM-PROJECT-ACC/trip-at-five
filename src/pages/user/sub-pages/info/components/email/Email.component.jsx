import { ButtonPrimary, ButtonSecondary } from '../../../../../../components';
import { ContentsRow, InfoInput, InfoInputLabel } from '../index';
import { AuthEmailCodeInput } from './auth-code/AuthCode.component';
import './email.style.scss';

export const Email = () => {
  return (
    <>
      <ContentsRow>
        <InfoInputLabel>이메일</InfoInputLabel>
        <InfoInput placeholder={'이메일을 입력해주세요'}>
          <ButtonPrimary className='input__button'>이메일 인증</ButtonPrimary>
        </InfoInput>
      </ContentsRow>
      {/* TODO: 이메일 인증 버튼 클릭, 응답 확인 후 인증번호 input 표시 */}
      {<AuthEmailCodeInput />}
    </>
  );
};
