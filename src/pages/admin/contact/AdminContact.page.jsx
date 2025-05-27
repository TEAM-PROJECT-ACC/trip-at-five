import AdminHeaderTitle from '../../../components/admin-header-title/AdminHeaderTitle.component';
import AdminHeader from '../local-components/header/AdminHeader.component';
import AdminSearch from '../local-components/header/search/AdminSearch.component';
import { FILTER_OPTION_LIST } from './constants/filter.constant';
import './adminContact.style.scss';

export const AdminContactPage = () => {
  return (
    <section className='admin-contact__container'>
      {/* 페이지 타이틀 */}
      <AdminHeader
        className='admin-contact__page-header'
        title='사용자 문의'
      >
        <AdminSearch
          className='admin-search-area__container'
          placeholder={'예약코드, 예약자명, 전화번호'}
        >
          <div className='admin-contact__select-box-container'>
            <select
              className='accom-type-select'
              name='accomTypeNo'
            >
              {FILTER_OPTION_LIST.map((value, idx) => (
                <option
                  key={idx}
                  value={value}
                >
                  {value}
                </option>
              ))}
            </select>
          </div>
        </AdminSearch>
      </AdminHeader>

      <section className='admin-contact__table-container'>
        {/* 테이블 */}
      </section>
      <div className='admin-contact__pagination-container'>
        {/* 페이지네이션 */}
      </div>
    </section>
  );
};
