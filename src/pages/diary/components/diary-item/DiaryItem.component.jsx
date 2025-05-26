import { useState } from 'react';
import { diaryCover } from '../../../../assets/images/index';
import './diaryItem.style.scss';
import { DiaryModal } from '../modal/DiaryModal.component';
import { useModal } from '../../../../hooks';

export const DiaryItem = ({ diary }) => {
  // const [isOpen, setIsOpen] = useState(() => false);
  const { handleModalPortals } = useModal();

  const handleClick = () => {
    // item click 시 애니메이션 적용 후 모달 열기
    // setIsOpen((prev) => !prev);
    handleModalPortals(DiaryModal);
  };

  return (
    <>
      <article
        className='diary-item__container'
        onClick={handleClick}
      >
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
      {/* {isOpen && <DiaryModal onClose={handleClick} />} */}
    </>
  );
};
