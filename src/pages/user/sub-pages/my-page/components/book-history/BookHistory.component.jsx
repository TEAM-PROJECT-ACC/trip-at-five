import { classNames } from '../../../../../../utils';
import { MyPageSectionTitle } from '../section-title/SectionTitle.component';
import { MdDocumentScanner } from '../../../../../../assets/icons/index';
import './bookHistory.style.scss';

export const BookHistory = ({ className }) => {
  return (
    <section
      className={classNames(
        className,
        'book-history__container',
        'my-page-section'
      )}
    >
      <MyPageSectionTitle
        className={classNames(className)}
        linkTo={'book-history'}
      >
        <MdDocumentScanner className='my-page__title-icon' />
        예약 내역
      </MyPageSectionTitle>
      <div className='book-history__info'>
        <div className='book-history__info-title'>KH 정보교육원</div>
        <div className='book-history__info-room'>A Class</div>
        <div className='book-history__info-address'>
          서울특별시 중구 남대문로 120
        </div>
        <div className='book-history__info-date'>2025년 05월 09일</div>
      </div>
    </section>
  );
};
