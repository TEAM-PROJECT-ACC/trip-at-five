import { ButtonSecondary } from '../../../../../../../components';
import { ContentsRow, InfoInput, InfoInputLabel } from '../../index';

export const AuthEmailCodeInput = () => {
  return (
    <ContentsRow>
      <InfoInputLabel>인증번호</InfoInputLabel>
      <InfoInput placeholder={'인증번호를 입력해주세요'}>
        <ButtonSecondary className='input__button'>인증하기</ButtonSecondary>
      </InfoInput>
    </ContentsRow>
  );
};
