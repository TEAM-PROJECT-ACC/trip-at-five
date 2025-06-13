import { useState } from 'react';
import { InputPrimary, Textarea } from '../../../../components';
import './diaryModal.style.scss';

export const DiaryModal = ({
  isReadOnly,
  diary,
  children,
  onChangeInput,
  onChangeTextarea,
}) => {
<<<<<<< HEAD
=======
  // TODO: 입력 값 제한 (글자 수)
>>>>>>> 3d6f558e03c59beb0755f1c69b77925b5d5ea1e6
  const [diaryTitle, setDiaryTitle] = useState(() => diary?.diaryTitle);
  const [diaryCont, setDiaryCont] = useState(() => diary?.diaryCont);

  const handleChangeInput = (event) => {
<<<<<<< HEAD
=======
    event.stopPropagation();
>>>>>>> 3d6f558e03c59beb0755f1c69b77925b5d5ea1e6
    const targetValue = event.target.value;
    setDiaryTitle(() => targetValue);
    if (onChangeInput) {
      onChangeInput(event);
    }
  };

  const handleChangeTextarea = (event) => {
    const targetValue = event.target.value;
    setDiaryCont(() => targetValue);
    if (onChangeTextarea) {
      onChangeTextarea(event);
    }
  };

  return (
    <div className='diary-modal__container'>
      <InputPrimary
        className='diary-modal__title'
        readOnly={isReadOnly}
        placeholder={'일지 제목을 입력해 주세요'}
        defaultValue={diaryTitle}
        onChange={handleChangeInput}
      />
      <Textarea
        className='diary-modal__contents'
        readOnly={isReadOnly}
        placeholder={'일지를 작성해 주세요'}
        defaultValue={diaryCont}
        onChange={handleChangeTextarea}
      />
      <div className='diary-modal__btn-container'>{children}</div>
    </div>
  );
};
