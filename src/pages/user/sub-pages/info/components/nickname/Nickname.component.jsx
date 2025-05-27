import { ButtonPrimary, ButtonSecondary } from '../../../../../../components';
import { ContentsRow, InfoInput, InfoInputLabel } from '../index';
import './nickname.style.scss';

export const Nickname = () => {
  return (
    <ContentsRow>
      <InfoInputLabel>닉네임</InfoInputLabel>
      <InfoInput placeholder={'닉네임을 입력해주세요'}>
        <ButtonSecondary className='input__button'>중복 검사</ButtonSecondary>
        <ButtonPrimary className='input__button'>추천 닉네임</ButtonPrimary>
      </InfoInput>
    </ContentsRow>
  );
};
