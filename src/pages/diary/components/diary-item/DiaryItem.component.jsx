import { useState } from 'react';
import { diaryCover } from '../../../../assets/images/index';
import { Button, Modal } from '../../../../components';
import { useModal } from '../../../../hooks';
import { DiaryModal } from '../modal/DiaryModal.component';
import { DiaryAnimation } from '../diary-animation/DiaryAnimaition.component';
import { classNames } from '../../../../utils';
import './diaryItem.style.scss';

export const DiaryItem = ({ diary }) => {
  const [isStartAnimation, setIsStartAnimation] = useState(() => false);
  const [isMouseOver, setIsMouseOver] = useState(() => false);
  const { isModalOpen, handleModalOpen } = useModal();

  const onClickRead = () => {
    setIsStartAnimation(() => true);
  };

  const onClickModify = () => {
    handleModalOpen();
  };

  const handleMouseOver = () => {
    setIsMouseOver(() => true);
  };

  const handleMouseLeave = () => {
    setIsMouseOver(() => false);
  };

  return (
    <>
      <article
        className={classNames(
          'diary-item__container',
          isMouseOver ? 'rotate' : ''
        )}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        {isMouseOver && (
          <div className='diary-item__btn-container'>
            <Button
              className='diary-item__button'
              onClick={onClickModify}
            >
              수정
            </Button>
            <Button
              className='diary-item__button'
              onClick={onClickRead}
            >
              조회
            </Button>
          </div>
        )}
        <img
          className='diary-item__cover-img'
          src={diaryCover}
          alt='diary-cover'
        />
        {/* 제목 */}
        <div className='diary-item__title'>
          <span className='diary-item__title-inner diary-text'>
            열여섯글자테스트텍스트열여섯글자
          </span>
        </div>
        {/* 날짜 */}
        <div className='diary-item__date diary-text'>2025/05/26</div>
      </article>
      {isModalOpen && (
        <Modal
          modalHandler={handleModalOpen}
          useCloseIcon
        >
          <DiaryModal
            diary={diary}
            isReadOnly
          />
        </Modal>
      )}
      {isStartAnimation && (
        <DiaryAnimation onClose={() => setIsStartAnimation(false)} />
      )}
    </>
  );
};
