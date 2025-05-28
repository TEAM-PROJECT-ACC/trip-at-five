import './AdminMain.style.scss';
import AdminHeader from '../local-components/header/AdminHeader.component';
import AdminSearch from '../local-components/header/search/AdminSearch.component';
import { useNavigate } from 'react-router-dom';
import { BsFillHouseAddFill } from '../../../assets/icons/index';
import AdminIconButton from '../../../components/buttons/admin-icon-button/AdminIconButton.component';
import AdminManagementList from '../local-components/list/AdminManagementList.component';
import { listSampleData } from '../../../assets/sample-data/listSampleData';
import { AdminPagination } from '../../../components/admin-pagination/AdminPagination.component';
import { useEffect, useState } from 'react';
const dataList = listSampleData.accommodation_tb;

const accomColumnList = [
  { name: '숙소번호', className: 'col-w-5' },
  { name: '숙소유형', className: 'col-w-10' },
  { name: '숙소명', className: 'col-w-30' },
  { name: '주소', className: 'col-w-30' },
  { name: '전화번호', className: 'col-w-15' },
  { name: '최소가', className: 'col-w-5' },
];

const AdminMain = () => {
  const navigate = useNavigate();

  // 등록 페이지 이동 핸들러
  const registerPageHandler = () => {
    navigate('/admin/accommodations/new');
  };
  // 수정 페이지 이동 핸들러
  const detailPageHandler = (accomNo) => {
    console.log(accomNo);
    navigate(`/admin/accommodations/${accomNo}/edit`);
  };

  return (
    <div className='accom-list__container'>
      <AdminHeader
        className='admin-main-header'
        title='숙박업소관리'
      >
        <AdminSearch
          className='admin-search-area__container'
          placeholder={'숙박업소명 혹은 지역을 입력해주세요'}
        >
          <AdminIconButton
            onClick={registerPageHandler}
            children={<BsFillHouseAddFill />}
          />
        </AdminSearch>
      </AdminHeader>
      <AdminManagementList
        columnList={accomColumnList}
        dataList={dataList}
        onClickRow={detailPageHandler}
      />
    </div>
  );
};

export default AdminMain;
