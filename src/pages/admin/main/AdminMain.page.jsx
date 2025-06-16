import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AdminHeader from '../local-components/header/AdminHeader.component';
import AdminSearch from '../local-components/header/search/AdminSearch.component';
import AdminIconButton from '../../../components/buttons/admin-icon-button/AdminIconButton.component';
import AdminManagementList from '../local-components/list/AdminManagementList.component';
import { BsFillHouseAddFill } from '../../../assets/icons/index';
import { selectAdminAccomList } from '../../../services/accom/accomService.api';
import './AdminMain.style.scss';
import { useAdminSearchStore } from '../../../states/admin-search/adminSearchStore';

const accomColumnList = [
  { name: '숙소번호', className: 'col-w-5' },
  { name: '숙소유형', className: 'col-w-10' },
  { name: '숙소명', className: 'col-w-30' },
  { name: '주소', className: 'col-w-30' },
  { name: '전화번호', className: 'col-w-15' },
  { name: '최소가', className: 'col-w-5' },
];

const AdminMain = () => {

  const { keyword } = useAdminSearchStore((state) => state);
  const [dataList, setDataList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const [params, setParams] = useState({
    pageNo: 1,
    numOfRows: 10,
    keyword: '',
  });

  const navigate = useNavigate();

  const handleSearch = () => {
    setParams(prev => ({
      ...prev,
      keyword: keyword, 
      pageNo: 1,   
    }));
  };
  
  const handlePagination = (pageNo) => {
    setParams((prev) => ({
      ...prev,
      pageNo: pageNo,
    }));
    navigate(`?currentPage=${pageNo}`);
  };

  // 등록 페이지 이동 핸들러
  const registerPageHandler = () => {
    navigate('/admin/accommodations/new');
  };
  // 수정 페이지 이동 핸들러
  const detailPageHandler = (no, id) => {
    let accomNo = `${no !== undefined ? no : ''}`;
    console.log(accomNo);
    // console.log(accomNo);
    navigate(`/admin/accommodations/${accomNo}/edit`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // API 응답 데이터를 직접 변수에 저장합니다.
        const responseData = await selectAdminAccomList(
          params.keyword,
          params.pageNo,      // ## 여기를 params.currentPage 에서 params.pageNo 로 수정! ##
          params.numOfRows
        );

        if (!responseData || !responseData.dataList) {
          throw new Error("API 응답 데이터 형식이 올바르지 않습니다.");
        }

        setDataList(responseData.dataList);
        setTotalCount(responseData.pageInfo.totalCount);
      } catch (error) {
        console.error("데이터 처리 중 에러 발생:", error);
      }
    };

    fetchData();
  }, [params]);

  return (
    <div className='accom-list__container'>
      <AdminHeader
        className='admin-main-header'
        title='숙박업소관리'
      >
        <AdminSearch
          className='admin-search-area__container'
          placeholder={'숙박업소명 혹은 지역을 입력해주세요'}
          onClick={handleSearch}
        >
          <AdminIconButton
            onClick={registerPageHandler}
            children={<BsFillHouseAddFill />}
          />
        </AdminSearch>
      </AdminHeader>
      <AdminManagementList
        numOfRows={params.numOfRows}
        currentPage={params.pageNo}
        columnList={accomColumnList}
        dataList={dataList}
        pageLength={10}
        totalCount={totalCount}
        onClickRow={detailPageHandler}
        onPageChange={handlePagination}
      />
    </div>
  );
};

export default AdminMain;
