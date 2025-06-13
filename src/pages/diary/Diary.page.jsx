<<<<<<< HEAD
import { Button, Modal, PageContainer } from '../../components';
import { useDiaryList } from './hooks/useDiaryList.hook';
import { useModal } from '../../hooks';
import { InsertModal } from './components/modal/InsertModal.component';
import { DiaryItem } from './components/diary-item/DiaryItem.component';
import { DiaryProvider } from './stores';
=======
import { Button, Modal, PageContainer, Pagination } from '../../components';
import { ToastContainer } from 'react-toastify';
import { useModal } from '../../hooks';
import { InsertModal } from './components/modal/InsertModal.component';
import { DiaryList } from './components/diary-list/DiaryList.component';
>>>>>>> 3d6f558e03c59beb0755f1c69b77925b5d5ea1e6
import './diary.style.scss';

export const DiaryPage = () => {
  const { diaryList } = useDiaryList();
  const { isModalOpen, handleModalOpen } = useModal();

  const handleClickPost = () => {
    handleModalOpen();
  };

  // TODO: 로그인 정보가 없으면 로그인 페이지로 리디렉션 (useEffect)

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
<<<<<<< HEAD
      <div className='diary-page__diary-list-container'>
        {diaryList &&
          diaryList.length > 0 &&
          diaryList.map((diary) => {
            // NOTI:
            // React에서 배열 mapping 시 전달하는 key property의 값을 배열의 index로 사용할 경우
            // 배열이 업데이트 되어도 업데이트(특히 추가)된 아이템을 조회하지 않고 기존 index에 있는 데이터를 재사용 함 (변경 감지 못함)
            // TODO: 다음 PR 때 주석 삭제
            return (
              <DiaryProvider
                key={diary.diarySq}
                initialDiary={diary}
              >
                <DiaryItem initDiary={diary} />
              </DiaryProvider>
            );
          })}
        {/* totalCount > 10 && pagination */}
      </div>
=======
      <DiaryList />
      <ToastContainer />
>>>>>>> 3d6f558e03c59beb0755f1c69b77925b5d5ea1e6
    </PageContainer>
  );
};
