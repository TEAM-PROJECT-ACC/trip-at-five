import { useEffect, useState } from 'react';
import AdminHeader from '../local-components/header/AdminHeader.component';
import AdminSearch from '../local-components/header/search/AdminSearch.component';
import AdminManagementList from '../local-components/list/AdminManagementList.component';
import { Modal } from '../../../components';
import { useModal } from '../../../hooks';
import { cancelData } from '../../../assets/sample-data/cancelReservationSampleData';
import './ReservationCancelList.style.scss';
import { useQuery } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';
import {
  getPaymentCancel,
  reservationCancelList,
  selectReservationDetail,
} from './api/reservationCancel.api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAdminSearchStore } from '../../../states/admin-search/adminSearchStore';

const cancelReservationColumnList = [
  { name: '예약코드', className: 'col-w-20' },
  { name: '영수증ID', className: 'col-w-30' },
  { name: '예약자명', className: 'col-w-20' },
  { name: '결제수단', className: 'col-w-10' },
  { name: '결제상태', className: 'col-w-20' },
];

const ReservationCancelList = () => {
  const navigate = useNavigate();
  const { isModalOpen, handleModalOpen } = useModal();
  const [modalRow, setModalRow] = useState(null);
  const [modalDetail, setModalDetail] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
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
    data: resCancelList,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['cancelReservationData', searchParams],
    queryFn: async () => {
      const { data, status } = await reservationCancelList(searchParams);
      if (status !== HttpStatusCode.Ok) {
        throw new Error('예약취소건 조회에 실패했습니다.');
      }

      console.log('예약 목록 조회 성공:', data);
      return data;
    },
    enabled: isInitialLoad, // 처음 로드 시 자동 실행, 검색 시에는 refetch로만 실행
    keepPreviousData: true,
  });

  // 페이지네이션 클릭 핸들러
  const handlePagination = (pageNo) => {
    setPageInfo((prev) => ({ ...prev, currentPage: pageNo }));
    setSearchParams((prev) => ({ ...prev, currentPage: pageNo }));
    navigate(`?currentPage=${pageNo}`);
  };

  // 검색 버튼 클릭 시
  const handleResCancelSearch = () => {
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

  const modalHandler = async (resCode) => {
    console.log('선택된 예약 취소 건:', resCode);
    setModalRow(resCode);
    setModalDetail(null);
    setModalLoading(true);
    handleModalOpen(true);

    try {
      const { data, status } = await selectReservationDetail(resCode);
      if (status === 200) {
        setModalDetail(data);
      }
    } catch (e) {
      setModalDetail(null);
    } finally {
      setModalLoading(false);
    }
  };

  // 결제 취소 이벤트 핸들러
  const paymentCancelHandler = async (receiptId, resCd) => {
    console.log('receiptId, resCd : ' + receiptId + ',' + resCd);
    if (!receiptId) return;

    try {
      const { data: cancelResult, status } = await getPaymentCancel(
        receiptId,
        resCd
      );
      console.log('결제취소 : ', cancelResult);

      if (status !== HttpStatusCode.Ok) toast.error('결제 취소 실패');
      else toast.success(`결제 취소 완료 ${cancelResult}`);

      setTimeout(() => {
        navigate(0);
      }, 1500);
    } catch (err) {
      console.error('결제취소 오류: ', err);
    }
  };

  // 검색어가 비어있어지면 전체 조회로 복귀
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
    <div className='reservation-cancel__container'>
      <AdminHeader
        className='admin-main-header'
        title='예약취소요청'
      >
        <AdminSearch
          className='admin-search-area__container'
          onClick={handleResCancelSearch}
          placeholder={'예약코드 혹은 예약자명을 입력해주세요'}
        />
      </AdminHeader>

      <AdminManagementList
        columnList={cancelReservationColumnList}
        dataList={
          !isLoading && resCancelList && Array.isArray(resCancelList?.dataList)
            ? resCancelList?.dataList
            : []
        }
        onClickRow={modalHandler}
        totalCount={resCancelList?.totalCount || 0}
        currentPage={pageInfo.currentPage}
        numOfRows={pageInfo.numOfRows}
        onPageChange={handlePagination}
        pageLength={10}
      />

      {isModalOpen && modalRow && (
        <Modal
          modalHandler={handleModalOpen}
          className='reservation-cancel-modal'
          useCloseIcon={true}
        >
          <div className='reservation-cancel-header'>
            <h1 className='res-code'>{modalRow.resCd}</h1>
            <span>상세</span>
          </div>
          <hr />
          <div className='reservation-cancel-body'>
            {modalLoading && <div>로딩중...</div>}
            {!modalLoading && modalDetail && (
              <>
                <section className='reservation-cancel-item'>
                  <h3>사용자이메일</h3>
                  <h3>예약자명</h3>
                  <h3>전화번호</h3>
                  <h3>인원수</h3>
                  <h3>CheckIn</h3>
                  <h3>CheckOut</h3>
                  <h3>예약일</h3>
                  <h3>숙박업소번호</h3>
                  <h3>객실번호</h3>
                </section>
                <section className='reservation-cancel-item'>
                  <h3>{modalDetail.resEmailId}</h3>
                  <h3>{modalDetail.resName}</h3>
                  <h3>{modalDetail.resPhone}</h3>
                  <h3>{modalDetail.resNumOfPeo}</h3>
                  <h3>{modalDetail.checkInDt}</h3>
                  <h3>{modalDetail.checkOutDt}</h3>
                  <h3>{modalDetail.resRegDt}</h3>
                  <h3>{modalDetail.accomName}</h3>
                  <h3>{modalDetail.roomName}</h3>
                </section>
              </>
            )}
            {!modalLoading && !modalDetail && (
              <div>상세 정보를 불러올 수 없습니다.</div>
            )}
          </div>
          <button
            className='reservation-cancel-button'
            onClick={() =>
              paymentCancelHandler(modalDetail.receiptId, modalDetail.resCd)
            }
          >
            예약취소
          </button>
        </Modal>
      )}
    </div>
  );
};

export default ReservationCancelList;
