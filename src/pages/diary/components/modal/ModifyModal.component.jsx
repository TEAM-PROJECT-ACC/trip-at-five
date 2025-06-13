import { useState } from 'react';
<<<<<<< HEAD
import {
  ButtonPrimary,
  ButtonSecondary,
  InputPrimary,
  Textarea,
} from '../../../../components';
import { useDiaryStore } from '../../stores';
import { useDiaryList } from '../../hooks/useDiaryList.hook';
import { DiaryModal } from './DiaryModal.component';
=======
import { toast } from 'react-toastify';
import { ButtonPrimary, ButtonSecondary, Modal } from '../../../../components';
import { useDiaryStore } from '../../stores';
import { useDiaryList } from '../../hooks/useDiaryList.hook';
import { DiaryModal } from './DiaryModal.component';
import { ConfirmModal } from './ConfirmModal.component';
>>>>>>> 3d6f558e03c59beb0755f1c69b77925b5d5ea1e6
import './diaryModal.style.scss';

export const ModifyModal = () => {
  const { diary, actions } = useDiaryStore();
  const { deleteDiary } = useDiaryList();
  const [readOnly, setReadOnly] = useState(() => true);
  const [isModified, setIsModified] = useState(() => false);
<<<<<<< HEAD
=======
  const [isOpenConfirm, setIsOpenConfirm] = useState(() => false);
>>>>>>> 3d6f558e03c59beb0755f1c69b77925b5d5ea1e6
  const [diaryTitle, setDiaryTitle] = useState(() => diary?.diaryTitle);
  const [diaryCont, setDiaryCont] = useState(() => diary?.diaryCont);

  const handleModifyButton = () => {
<<<<<<< HEAD
    setReadOnly(() => false);
    setIsModified(() => true);
=======
    setReadOnly((prev) => !prev);
    setIsModified((prev) => !prev);
>>>>>>> 3d6f558e03c59beb0755f1c69b77925b5d5ea1e6
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
<<<<<<< HEAD
=======
    toast(<>일지가 수정 되었습니다.</>, { position: 'top-center' });
    handleModifyButton();
  };

  const handleDeleteConfirm = () => {
    setIsOpenConfirm((prev) => !prev);
>>>>>>> 3d6f558e03c59beb0755f1c69b77925b5d5ea1e6
  };

  const handleDeleteDiary = () => {
    deleteDiary({ diary, pageNo: 1, numOfRows: 10 });
<<<<<<< HEAD
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
=======
    toast(<>일지를 삭제하였습니다.</>, { position: 'top-center' });
  };

  return (
    <>
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
              onClick={handleDeleteConfirm}
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
      {isOpenConfirm && (
        <Modal>
          <ConfirmModal
            onConfirm={handleDeleteDiary}
            onClose={handleDeleteConfirm}
          />
        </Modal>
      )}
    </>
>>>>>>> 3d6f558e03c59beb0755f1c69b77925b5d5ea1e6
  );
};
