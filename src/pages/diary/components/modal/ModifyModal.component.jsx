import { useState } from 'react';
import {
  ButtonPrimary,
  ButtonSecondary,
  InputPrimary,
  Textarea,
} from '../../../../components';
import { useDiaryStore } from '../../stores';
import { useDiaryList } from '../../hooks/useDiaryList.hook';
import { DiaryModal } from './DiaryModal.component';
import './diaryModal.style.scss';

export const ModifyModal = () => {
  const { diary, actions } = useDiaryStore();
  const { deleteDiary } = useDiaryList();
  const [readOnly, setReadOnly] = useState(() => true);
  const [isModified, setIsModified] = useState(() => false);
  const [diaryTitle, setDiaryTitle] = useState(() => diary?.diaryTitle);
  const [diaryCont, setDiaryCont] = useState(() => diary?.diaryCont);

  const handleModifyButton = () => {
    setReadOnly(() => false);
    setIsModified(() => true);
  };

  const handleChangeInput = (event) => {
    const targetValue = event.target.value;
    setDiaryTitle(() => targetValue);
  };

  const handleChangeTextarea = (event) => {
    const targetValue = event.target.value;
    setDiaryCont(() => targetValue);
  };

  const handleModify = () => {
    const modifiedDiary = {
      ...diary,
      diaryTitle,
      diaryCont,
    };

    actions.modifyDiary(modifiedDiary);
  };

  const handleDeleteDiary = () => {
    deleteDiary({ diary, pageNo: 1, numOfRows: 10 });
  };

  return (
    <DiaryModal
      diary={diary}
      isReadOnly={readOnly}
      onChangeInput={handleChangeInput}
      onChangeTextarea={handleChangeTextarea}
    >
      {readOnly && !isModified && (
        <ButtonPrimary
          className='diary-modal__button'
          onClick={handleModifyButton}
        >
          수정 하기
        </ButtonPrimary>
      )}
      {!readOnly && isModified && (
        <>
          <ButtonSecondary
            className='diary-modal__button'
            onClick={handleDeleteDiary}
          >
            삭제
          </ButtonSecondary>
          <ButtonPrimary
            className='diary-modal__button'
            onClick={handleModify}
          >
            수정 완료
          </ButtonPrimary>
        </>
      )}
    </DiaryModal>
  );
};
