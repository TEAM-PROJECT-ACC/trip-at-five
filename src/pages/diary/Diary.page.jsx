import { Button, Modal, PageContainer, Pagination } from '../../components';
import { ToastContainer } from 'react-toastify';
import { useModal } from '../../hooks';
import { InsertModal } from './components/modal/InsertModal.component';
import { DiaryList } from './components/diary-list/DiaryList.component';
import './diary.style.scss';

export const DiaryPage = () => {
  const { isModalOpen, handleModalOpen } = useModal();

  const handleClickPost = () => {
    handleModalOpen();
  };

  return (
    <PageContainer className='diary-page__container'>
      <div className='diary-page__title-container'>
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
            <InsertModal
              isReadOnly={false}
              onClose={handleClickPost}
            />
          </Modal>
        )}
      </div>
      <DiaryList />
      <ToastContainer />
    </PageContainer>
  );
};
