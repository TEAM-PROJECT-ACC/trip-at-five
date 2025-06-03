import { useState } from 'react';
import { ButtonPrimary } from '../../../../components';
import { useDiaryList } from '../../hooks/useDiaryList.hook';
import { DiaryModal } from './DiaryModal.component';
import './diaryModal.style.scss';

export const InsertModal = ({ onClose }) => {
  const { insertDiary } = useDiaryList();
  const [diaryTitle, setDiaryTitle] = useState(() => '');
  const [diaryCont, setDiaryCont] = useState(() => '');

  const handleChangeInput = (event) => {
    const targetValue = event.target.value;
    setDiaryTitle(() => targetValue);
  };

  const handleChangeTextarea = (event) => {
    const targetValue = event.target.value;
    setDiaryCont(() => targetValue);
  };

  const handleInsertDiary = () => {
    const diary = {
      memNo: 23,
      diaryTitle,
      diaryCont,
    };

    insertDiary({
      diary,
      pageNo: 1,
      numOfRows: 10,
    });
    if (onClose) {
      onClose();
    }
  };

  return (
    <DiaryModal
      onChangeInput={handleChangeInput}
      onChangeTextarea={handleChangeTextarea}
    >
      <ButtonPrimary
        className='diary-modal__button'
        onClick={handleInsertDiary}
      >
        등록 하기
      </ButtonPrimary>
    </DiaryModal>
  );
};
