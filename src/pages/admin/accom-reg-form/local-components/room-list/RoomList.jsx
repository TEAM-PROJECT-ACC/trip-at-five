import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import AdminIconButton from '../../../../../components/buttons/admin-icon-button/AdminIconButton.component';
import AdminHeader from '../../../local-components/header/AdminHeader.component';
import AdminSearch from '../../../local-components/header/search/AdminSearch.component';
import AdminManagementList from '../../../local-components/list/AdminManagementList.component';
import { selectRoomListAPI } from '../../../../../services/room/roomService.api';
import { useAdminSearchStore } from '../../../../../states/admin-search/adminSearchStore';
import { findRoomByAccomNoAndRoomNameLike } from '../../../../../services/room/findRoomByAccomNoAndRoomNameLike.api';
import { BsFillHouseAddFill } from '../../../../../assets/icons/index';
import './RoomList.style.scss';

const roomColumnList = [
  { name: '객실번호', className: 'col-w-10' },
  { name: '객실명', className: 'col-w-30' },
  { name: '객실수', className: 'col-w-30' },
  { name: '객실가격', className: 'col-w-30' },
];

const RoomList = () => {
  const [searchData, setSearchData] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { keyword } = useAdminSearchStore((state) => state);
  const params = useParams();
  const navigate = useNavigate();
  const accomNo = params.id;

  const { data, isLoading } = useQuery({
    /**
     * 쿼리 함수에서 사용하는 변수는 기본적으로 queryKey에 포함되어야 함
     */
    queryKey: ['roomList', accomNo, searchParams.get('currentPage')],
    queryFn: async () => {
      const { data } = await selectRoomListAPI(
        accomNo,
        searchParams.get('currentPage')
      );

      console.log(data);
      return data ?? [];
    },
    // enabled: !!accomNo, // 초기 accomNo undefined 될 때 에러 방지
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

  // 객실 검색 API 호출 핸들러
  const handleSearchRoom = async (keyword) => {
    if (keyword && keyword.trim().length > 0) {
      const { data } = await findRoomByAccomNoAndRoomNameLike(accomNo, keyword);

      console.log(data);
      setSearchData(data ?? []);
    } else {
      setSearchData(null);
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

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
            onClick={() => handleSearchRoom(keyword)}
          >
            <AdminIconButton
              onClick={roomFormPageHandler}
              children={<BsFillHouseAddFill />}
            />
          </AdminSearch>
          <AdminManagementList
            columnList={roomColumnList}
            dataList={!isLoading ? searchData ?? data : []}
            onClickRow={roomFormPageHandler}
          />
        </AdminHeader>
      </div>
    </>
  );
};

export default RoomList;
