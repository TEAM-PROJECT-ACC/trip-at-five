import { Button, ButtonPrimary, Modal, PageContainer } from '../../components';
import { useModal } from '../../hooks';
import { DiaryItem } from './components/diary-item/DiaryItem.component';
import { DiaryModal } from './components/modal/DiaryModal.component';
import './diary.style.scss';

export const DiaryPage = () => {
  const { isModalOpen, handleModalOpen } = useModal();

  const handleClickPost = () => {
    handleModalOpen();
  };

  return (
    <PageContainer className='diary-page__container'>
      <div className='diary-page__title-container'>
        {/* 타이틀 폰트 변경 */}
        <div className='diary-page__title'>나의 일지</div>
        <Button
          className='diary-page__button'
          onClick={handleClickPost}
        >
          새 일지 작성
        </Button>
        {isModalOpen && (
          <Modal
            modalHandler={handleModalOpen}
            useCloseIcon={true}
          >
            <DiaryModal isReadOnly={false} />
          </Modal>
        )}
      </div>
      <div className='diary-page__diary-list-container'>
        {/* TODO: diaryList map */}
        <DiaryItem />
        <DiaryItem />
        <DiaryItem />
        <DiaryItem />
        <DiaryItem />
        <DiaryItem />
        <DiaryItem />
        <DiaryItem />
        <DiaryItem />
        <DiaryItem />
        {/* totalCount > 10 && pagination */}
      </div>
    </PageContainer>
  );
};
