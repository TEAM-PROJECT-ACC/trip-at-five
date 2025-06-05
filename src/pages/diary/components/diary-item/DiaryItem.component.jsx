import { useState } from 'react';
import { diaryCover } from '../../../../assets/images/index';
import { Button, Modal } from '../../../../components';
import { useModal } from '../../../../hooks';
import { ModifyModal } from '../modal/ModifyModal.component';
import { DiaryAnimation } from '../diary-animation/DiaryAnimaition.component';
import { classNames } from '../../../../utils';
import { getFormattedDate } from '../../../../utils/formatDate/formatDate';
import { DATE_FORMAT } from '../../../../utils/formatDate/constants/dateFormat.constant';
import { useDiaryStore } from '../../stores';
import './diaryItem.style.scss';

export const DiaryItem = () => {
  const { diary } = useDiaryStore();

  const [isStartAnimation, setIsStartAnimation] = useState(() => false);
  const [isMouseOver, setIsMouseOver] = useState(() => false);
  const { isModalOpen, handleModalOpen } = useModal();

  const onClickRead = () => {
    setIsStartAnimation(() => true);
    // handleReadDiary({ memNo: 2, diarySq: diary.diarySq });
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
    diary && (
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
          <div className='diary-item__title'>
            <span className='diary-item__title-inner diary-text'>
              {/* TODO: 한글 기준 13자 초과 시 표시 방법 변경 */}
              {diary.diaryTitle}
            </span>
          </div>
          <div className='diary-item__date diary-text'>
            {getFormattedDate(diary.diaryRegDt, DATE_FORMAT.SLASH_DATE)}
          </div>
        </article>
        {isModalOpen && (
          <Modal
            modalHandler={handleModalOpen}
            useCloseIcon
          >
            <ModifyModal />
          </Modal>
        )}
        {isStartAnimation && (
          <DiaryAnimation onClose={() => setIsStartAnimation(false)} />
        )}
      </>
    )
  );
};
