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
import { HttpStatusCode } from 'axios';

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

  const query = new URLSearchParams(location.search);
  const currentPage = parseInt(query.get('currentPage') || '1', 10);

  const { keyword } = useAdminSearchStore((state) => state);
  const [pageInfo, setPageInfo] = useState({
    currentPage,
    numOfRows: 10,
  });

  // 검색 파라미터 상태
  const [searchParams, setSearchParams] = useState({
    currentPage,
    numOfRows: 10,
    keyword: '',
  });

  // 검색 버튼 클릭 여부
  const [isSearchClicked, setIsSearchClicked] = useState(false);

  // 초기 로드 여부 판단
  const isInitialLoad = !searchParams.keyword && !isSearchClicked;

  const {
    data: roomDataList,
    isLoading,
    refetch,
  } = useQuery({
    /**
     * 쿼리 함수에서 사용하는 변수는 기본적으로 queryKey에 포함되어야 함
     */
    queryKey: ['roomList', searchParams, accomNo],
    queryFn: async () => {
      const { data, status } = await selectRoomListAPI(accomNo, searchParams);

      if (status !== HttpStatusCode.Ok) {
        throw new Error('예약 목록 조회에 실패했습니다.');
      }

      return data;
    },
    // enabled: !!accomNo, // 초기 accomNo undefined 될 때 에러 방지
    keepPreviousData: true,
    enabled: isInitialLoad,
  });

  // 객실 등록 페이지 이동 핸들러
  const roomFormPageHandler = (no) => {
    // console.log(no);
    // console.log(accomNo);
    // navigate(`/admin/accommodations/${accomNo}/rooms`, { state: { no } });

    // navigate(`/admin/accommodations/${accomNo}/rooms/${no}`);
    let roomNo = `${no !== undefined ? no : ''}`;
    navigate(`/admin/accommodations/${accomNo}/rooms/` + roomNo);
  };

  // 페이지네이션 클릭 핸들러
  const handlePagination = (pageNo) => {
    setPageInfo((prev) => ({ ...prev, currentPage: pageNo }));

    // 검색 파라미터의 현재 페이지도 함께 업데이트
    setSearchParams((prev) => ({ ...prev, currentPage: pageNo }));

    navigate(`?currentPage=${pageNo}`);

    // 상태 업데이트가 비동기로 처리되므로, 다음 이벤트 루프에서 refetch 실행
    // 이렇게 하면 최신 상태값으로 API를 다시 호출할 수 있음
    // refetch : 캐시된 데이터를 서버에서 다시 가져오는 동작
    setTimeout(() => refetch(), 0);
  };

  // 검색 버튼 클릭 시
  const handleSearchRoom = () => {
    setPageInfo((prev) => ({ ...prev, currentPage: 1 }));
    setSearchParams({
      currentPage: 1,
      numOfRows: pageInfo.numOfRows,
      keyword,
    });
    setIsSearchClicked(true);
    navigate(`?currentPage=1`);
    setTimeout(() => refetch(), 0);
  };

  // 객실 검색 API 호출 핸들러
  // const handleSearchRoom = async (keyword) => {
  //   if (keyword && keyword.trim().length > 0) {
  //     const { data } = await findRoomByAccomNoAndRoomNameLike(accomNo, keyword);

  //     // console.log(data);
  //     setSearchData(data ?? []);
  //   } else {
  //     setSearchData(null);
  //   }
  // };

  // 검색어가 비어있어지면(검색창 clear 등) 전체 조회로 복귀
  useEffect(() => {
    if (!keyword) {
      setSearchParams({
        currentPage: 1,
        numOfRows: 10,
        keyword: '',
      });
      setIsSearchClicked(false);
    }
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
            onClick={() => handleSearchRoom(keyword)}
          >
            <AdminIconButton
              onClick={roomFormPageHandler}
              children={<BsFillHouseAddFill />}
            />
          </AdminSearch>
          <AdminManagementList
            columnList={roomColumnList}
            dataList={
              !isLoading &&
              roomDataList &&
              Array.isArray(roomDataList?.dataList)
                ? roomDataList?.dataList
                : []
            }
            onClickRow={roomFormPageHandler}
            totalCount={roomDataList?.totalCount || 0}
            currentPage={pageInfo.currentPage}
            numOfRows={pageInfo.numOfRows}
            onPageChange={handlePagination}
            pageLength={10}
          />
        </AdminHeader>
      </div>
    </>
  );
};

export default RoomList;
