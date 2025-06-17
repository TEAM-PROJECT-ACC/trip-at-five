import AdminHeader from '../local-components/header/AdminHeader.component';
import AdminSearch from '../local-components/header/search/AdminSearch.component';
import AdminManagementList from '../local-components/list/AdminManagementList.component';
import { DATA_COLUMN_LIST } from './constants/dataColumnList.constant';
import { useContactData } from './hooks/useContactData/useContactData.hook';
import { useEffect } from 'react';
import './adminContact.style.scss';
import { useNavigate } from 'react-router-dom';
import ChatStateStore from '../../chat/chatStore';

export const AdminContactPage = () => {
  const { setCategory, setRoomNo } = ChatStateStore();
  const {
    searchParams,
    contactList,
    isResAdmin,
    onClickPage,
    onClickSearchKeyword,
  } = useContactData();
  const navigate = useNavigate();

  const onClickRow = (no) => {
    setRoomNo(no);
    navigate('/chat/room');
  };

  useEffect(() => {
    setCategory(isResAdmin ? { value: 'RESERVE' } : { value: 'ETC' });
  }, [contactList, isResAdmin, setCategory]);

  return (
    <section className='admin-contact__container'>
      <AdminHeader
        className='admin-contact__page-header'
        title='사용자 문의'
      >
        <AdminSearch
          className='admin-search-area__container'
          placeholder={'문의 번호, 회원 닉네임, 회원 이메일'}
          defaultValue={searchParams.keyword}
          onClick={onClickSearchKeyword}
        ></AdminSearch>
      </AdminHeader>
      <section className='admin-contact__table-container'>
        <AdminManagementList
          columnList={DATA_COLUMN_LIST}
          dataList={contactList}
          onClickRow={onClickRow}
          totalCount={searchParams.totalCount}
          currentPage={searchParams.currentPage}
          onPageChange={onClickPage}
        />
      </section>
    </section>
  );
};
