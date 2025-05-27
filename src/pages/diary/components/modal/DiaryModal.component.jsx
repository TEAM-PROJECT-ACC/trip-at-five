import { useState } from 'react';
import {
  ButtonPrimary,
  ButtonSecondary,
  InputPrimary,
  Textarea,
} from '../../../../components';
import './diaryModal.style.scss';

export const DiaryModal = ({ diary, onClose, isReadOnly }) => {
  const [readOnly, setReadOnly] = useState(() => isReadOnly);
  const [isModified, setIsModified] = useState(() => false);

  const handleModify = () => {
    setReadOnly(() => false);
    setIsModified(() => true);
  };

  return (
    <div className='diary-modal__container'>
      <InputPrimary
        className='diary-modal__title'
        readOnly={readOnly}
        placeholder={'일지 제목을 입력해 주세요'}
      />
      <Textarea
        className='diary-modal__contents'
        readOnly={readOnly}
        placeholder={'일지를 작성해 주세요'}
      />
      <div className='diary-modal__btn-container'>
        {/* 새로 작성하기, 등록 하기 */}
        {!readOnly && !isModified && (
          <ButtonPrimary className='diary-modal__button'>
            등록 하기
          </ButtonPrimary>
        )}
        {/* 일지 읽기, 수정하기 */}
        {readOnly && !isModified && (
          <ButtonPrimary
            className='diary-modal__button'
            onClick={handleModify}
          >
            수정 하기
          </ButtonPrimary>
        )}
        {/* 수정하기, 삭제 / 수정 완료 */}
        {!readOnly && isModified && (
          <>
            <ButtonSecondary className='diary-modal__button'>
              삭제
            </ButtonSecondary>
            <ButtonPrimary className='diary-modal__button'>
              수정 완료
            </ButtonPrimary>
          </>
        )}
      </div>
    </div>
  );
};
