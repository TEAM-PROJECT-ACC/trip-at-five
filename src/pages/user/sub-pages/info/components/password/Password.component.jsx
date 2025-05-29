import { ContentsRow, InfoInput, InfoInputLabel } from '../index';
import './password.style.scss';

export const Password = () => {
  return (
    <>
      <ContentsRow>
        <InfoInputLabel>비밀번호</InfoInputLabel>
        <InfoInput placeholder={'비밀번호를 입력해주세요'} />
      </ContentsRow>
      <ContentsRow>
        <InfoInputLabel>비밀번호 확인</InfoInputLabel>
        <InfoInput placeholder={'비밀번호를 한번 더 입력해주세요'} />
      </ContentsRow>
    </>
  );
};
