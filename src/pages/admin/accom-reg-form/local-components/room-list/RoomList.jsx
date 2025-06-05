import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { BsFillHouseAddFill } from '../../../../../assets/icons/index';
import AdminIconButton from '../../../../../components/buttons/admin-icon-button/AdminIconButton.component';
import AdminHeader from '../../../local-components/header/AdminHeader.component';
import AdminSearch from '../../../local-components/header/search/AdminSearch.component';
import AdminManagementList from '../../../local-components/list/AdminManagementList.component';
import { roomData } from '../../../../../assets/sample-data/roomSampleData';
import './RoomList.style.scss';
import { useEffect } from 'react';
import { selectRoomListAPI } from '../../../../../services/room/roomService.api';
import { useQuery } from '@tanstack/react-query';
import { useAdminSearchStore } from '../../../../../states/admin-search/adminSearchStore';
import { useEffect } from 'react';

const roomList = roomData;

const roomColumnList = [
  { name: '객실번호', className: 'col-w-10' },
  { name: '객실명', className: 'col-w-30' },
  { name: '객실수', className: 'col-w-30' },
  { name: '객실가격', className: 'col-w-30' },
];

const RoomList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { keyword } = useAdminSearchStore((state) => state);
  const params = useParams();
  const navigate = useNavigate();
  const accomNo = params.id;

  const { data, isLoading, isError, error, refetch } = useQuery({
    /**
     * 쿼리 함수에서 사용하는 변수는 기본적으로 queryKey에 포함되어야 함
     */
    queryKey: ['roomList', accomNo, searchParams.get('currentPage')],
    queryFn: async () => {
      const { data } = await selectRoomListAPI(
        accomNo,
        searchParams.get('currentPage')
      );
      // console.log(data, isLoading, isError, error, refetch);
      return data ?? [];
    },
    staleTime: 1000 * 5,
  });

  // 객실 등록 페이지 이동 핸들러
  const roomFormPageHandler = (no) => {
    // console.log(no);
    // console.log(accomNo);
    // navigate(`/admin/accommodations/${accomNo}/rooms`, { state: { no } });

    // navigate(`/admin/accommodations/${accomNo}/rooms/${no}`);
    let roomNo = `${no !== undefined ? no : ''}`;
    // console.log(roomNo);
    navigate(`/admin/accommodations/2757748/rooms/` + roomNo);
  };

  useEffect(() => {
    console.log(keyword);
  }, [keyword]);

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
            dataList={!isLoading ? data : []}
            onClickRow={roomFormPageHandler}
          />
        </AdminHeader>
      </div>
    </>
  );
};

export default RoomList;
