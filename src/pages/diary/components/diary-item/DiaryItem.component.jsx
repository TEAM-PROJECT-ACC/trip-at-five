import { diaryCover } from '../../../../assets/images/index';
import { Modal } from '../../../../components';
import { useModal } from '../../../../hooks';
import { DiaryModal } from '../modal/DiaryModal.component';
import './diaryItem.style.scss';

export const DiaryItem = ({ diary }) => {
  const { isModalOpen, handleModalOpen } = useModal();

  const handleClick = () => {
    // item click 시 애니메이션 적용 후 모달 열기
    // setIsOpen((prev) => !prev);
  };

  return (
    <>
      <article
        className='diary-item__container'
        onClick={handleModalOpen}
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
    </>
  );
};
