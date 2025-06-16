import { useLocation, useNavigate } from 'react-router-dom';
import AdminHeader from '../local-components/header/AdminHeader.component';
import AdminSearch from '../local-components/header/search/AdminSearch.component';
import AdminManagementList from '../local-components/list/AdminManagementList.component';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import './ReservationManagementList.style.scss';
import { selectReservationList } from './api/reservationList.api';
import { useAdminSearchStore } from '../../../states/admin-search/adminSearchStore';
import { HttpStatusCode } from 'axios';

const reservationColumnList = [
  { name: '예약코드', className: 'col-w-10' },
  { name: '숙소명', className: 'col-w-30' },
  { name: '예약자명', className: 'col-w-10' },
  { name: '전화번호', className: 'col-w-20' },
  { name: '이메일', className: 'col-w-20' },
  { name: '예약상태', className: 'col-w-10' },
];

const ReservationManagementList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // URLSearchParams를 사용하여 현재 URL의 쿼리 파라미터를 가져옴
  // 웹의 URL 쿼리 문자열을 다루는 JavaScript의 내장 클래스
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

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['adminReservationList', searchParams],
    queryFn: async () => {
      const { data, status } = await selectReservationList(searchParams);
      if (status !== HttpStatusCode.Ok) {
        throw new Error('예약 목록 조회에 실패했습니다.');
      }
      return data;
    },

    // 쿼리가 자동으로 실행될지 여부를 결정
    enabled: isInitialLoad, // 처음 로드 시 자동 실행, 검색 시에는 refetch로만 실행

    // 새 데이터를 요청하는 동안 이전 데이터를 유지하여 UI가 깜빡이는 것을 방지하는 기능
    keepPreviousData: true,
  });

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
  const handleResSearch = () => {
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

  const detailPageHandler = (no) => {
    const resCode = no; // 예약코드
    console.log('예약 상세 페이지로 이동:', resCode);
    navigate(`/admin/reservations/${resCode}/detail`);
  };

  return (
    <div className='reservation-management__container'>
      <AdminHeader
        className='admin-main-header'
        title='예약관리'
      >
        <AdminSearch
          className='admin-search-area__container'
          onClick={handleResSearch}
          placeholder={'예약코드, 예약자명, 전화번호 중 하나를 입력해주세요'}
        />
      </AdminHeader>
      <AdminManagementList
        columnList={reservationColumnList}
        dataList={
          !isLoading && data && Array.isArray(data.dataList)
            ? data.dataList
            : []
        }
        totalCount={data?.totalCount || 0}
        currentPage={pageInfo.currentPage}
        numOfRows={pageInfo.numOfRows}
        onClickRow={detailPageHandler}
        onPageChange={handlePagination}
        pageLength={5}
      />
    </div>
  );
};

export default ReservationManagementList;
