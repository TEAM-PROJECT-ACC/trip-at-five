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
  const [diaryTitle, setDiaryTitle] = useState(() => diary?.diaryTitle);
  const [diaryCont, setDiaryCont] = useState(() => diary?.diaryCont);

  const handleChangeInput = (event) => {
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
