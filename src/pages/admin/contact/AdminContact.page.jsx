import AdminHeader from '../local-components/header/AdminHeader.component';
import AdminSearch from '../local-components/header/search/AdminSearch.component';
import AdminManagementList from '../local-components/list/AdminManagementList.component';
import { FILTER_LIST_OPTION } from './constants/filterListOption.constant';
import { DATA_COLUMN_LIST } from './constants/dataColumnList.constant';
import './adminContact.style.scss';
import { dummyData } from './temp/dummyData.temp';

export const AdminContactPage = () => {
  const onClickRow = () => {
    console.log('채팅 페이지로 navigate');
  };

  return (
    <section className='admin-contact__container'>
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
              {FILTER_LIST_OPTION.map((value, idx) => (
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
        <AdminManagementList
          columnList={DATA_COLUMN_LIST}
          dataList={dummyData}
          onClickRow={onClickRow}
        />
      </section>
      <div className='admin-contact__pagination-container'>
        {/* TODO: totalCount > 10 && pagination */}
      </div>
    </section>
  );
};
