import { useState } from 'react';
<<<<<<< HEAD
=======
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
>>>>>>> 3d6f558e03c59beb0755f1c69b77925b5d5ea1e6
import { ButtonPrimary } from '../../../../components';
import { useDiaryList } from '../../hooks/useDiaryList.hook';
import { DiaryModal } from './DiaryModal.component';
import './diaryModal.style.scss';

export const InsertModal = ({ onClose }) => {
<<<<<<< HEAD
=======
  const navigate = useNavigate();
>>>>>>> 3d6f558e03c59beb0755f1c69b77925b5d5ea1e6
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
<<<<<<< HEAD

=======
>>>>>>> 3d6f558e03c59beb0755f1c69b77925b5d5ea1e6
    insertDiary({
      diary,
      pageNo: 1,
      numOfRows: 10,
    });
<<<<<<< HEAD
=======
    // TODO: error 처리해야 함
    toast(<>일지 작성 완료</>, {
      position: 'top-center',
    });
    navigate('/diary', { replace: true });
>>>>>>> 3d6f558e03c59beb0755f1c69b77925b5d5ea1e6
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
