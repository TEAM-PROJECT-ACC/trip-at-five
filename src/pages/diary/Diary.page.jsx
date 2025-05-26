import { ButtonPrimary, PageContainer } from '../../components';
import { DiaryItem } from './components/diary-item/DiaryItem.component';
import './diary.style.scss';

export const DiaryPage = () => {
  return (
    <PageContainer className='diary-page__container'>
      <div className='diary-page__title-container'>
        <div className='diary-page__title'>나의 일지</div>
        <ButtonPrimary className='diary-page__button'>+</ButtonPrimary>
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
