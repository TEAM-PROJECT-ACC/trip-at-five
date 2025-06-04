import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ButtonPrimary } from '../../../../components';
import { useDiaryList } from '../../hooks/useDiaryList.hook';
import { DiaryModal } from './DiaryModal.component';
import './diaryModal.style.scss';

export const InsertModal = ({ onClose }) => {
  const navigate = useNavigate();
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
    // TODO: error 처리해야 함
    toast(<>일지 작성 완료</>, {
      position: 'top-center',
    });
    navigate('/diary', { replace: true });
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
