import { useNavigate, useParams } from 'react-router-dom';
import { BsFillHouseAddFill } from '../../../../../assets/icons/index';
import AdminIconButton from '../../../../../components/buttons/admin-icon-button/AdminIconButton.component';
import AdminHeader from '../../../local-components/header/AdminHeader.component';
import AdminSearch from '../../../local-components/header/search/AdminSearch.component';
import AdminManagementList from '../../../local-components/list/AdminManagementList.component';
import { roomData } from '../../../../../assets/sample-data/roomSampleData';
import './RoomList.style.scss';

const roomList = roomData;

const roomColumnList = [
  { name: '객실번호', className: 'col-w-10' },
  { name: '객실명', className: 'col-w-30' },
  { name: '객실수', className: 'col-w-30' },
  { name: '객실가격', className: 'col-w-30' },
];

const RoomList = () => {
  const params = useParams();
  const navigate = useNavigate();
  const accomNo = params.id;

  // 객실 등록 페이지 이동 핸들러
  const roomFormPageHandler = (no) => {
    console.log(no);
    console.log(accomNo);
    navigate(`/admin/accommodations/${accomNo}/rooms`, { state: { no } });
  };

  return (
    <>
      {/* 숙박업소 객실관리(목록) */}
      <div className='room-list__container'>
        <AdminHeader
          className='admin-main-header'
          title='객실관리'
        >
          <AdminSearch
            className='admin-search-area__container'
            placeholder={'객실명을 입력해주세요'}
          >
            <AdminIconButton
              onClick={roomFormPageHandler}
              children={<BsFillHouseAddFill />}
            />
          </AdminSearch>
          <AdminManagementList
            columnList={roomColumnList}
            dataList={roomList}
            onClickRow={roomFormPageHandler}
          />
        </AdminHeader>
      </div>
    </>
  );
};

export default RoomList;
