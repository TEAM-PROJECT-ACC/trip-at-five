import React from 'react';
import { useState, useEffect } from 'react';
import { Pagination } from '../../components/pagination/Pagination.component';
import FilterPanel from './local-components/filter/FilterPanel.component';
import MapButton from './local-components/map/MapButton.component';
import AccommodationListBox from './local-components/acc-items-box/AccommodationListBox.component';
import './accommodationList.style.scss';
import { PageContainer } from '../../components';
import { useFilterState } from './hooks/useFilterState.hook';
import { useAccomSearchStore } from '../../states';
import { formatDateForApi } from '../../utils/formatDate/formatDate';
import { searchAccommodationByKeyword } from '../../services/accom/apiService';

/**
 * 바뀔수 있는 정렬 조건 => 가격높은/낮은순, 평점높은순
 * 필수 정렬 조건 => 숙박업소명
 */

const AccommodationList = () => {
  const filterHook = useFilterState();
  const { setCurrentPage, filter } = filterHook;

  const keyword = useAccomSearchStore.getState().keyword;
  const checkIn = useAccomSearchStore.getState().checkIn;
  const checkOut = useAccomSearchStore.getState().checkOut;
  const numberOfPeople = useAccomSearchStore.getState().numberOfPeople;

  const pageSize = 10;

  // 숙박목록용 데이터
  const [accommodations, setAccommodations] = useState([]);
  // 모달 안 목록용 데이터
  const [allAccommodations, setAllAccommodations] = useState([]);

  const { currentPage, selectedCategory, selectedFacilities } = filter;

  const [minPrice, maxPrice] = filter.priceRange;

  const filteredAccommodations = accommodations.filter((item) => {
    if (selectedCategory && item.accomTypeNo !== selectedCategory) return false;

    if (selectedFacilities.length > 0) {
      const allFacilities = [
        ...(item.pubFacInfo ? item.pubFacInfo.split(',').map(f => f.trim()) : []),
        ...(item.inRoomFacInfo ? item.inRoomFacInfo.split(',').map(f => f.trim()) : []),
        ...(item.etcFacInfo ? item.etcFacInfo.split(',').map(f => f.trim()) : []),
      ];
      const hasAllSelected = selectedFacilities.every(facility => allFacilities.includes(facility));
      if (!hasAllSelected) return false;
    }

    const minRoomPrice = item.roomPrice;
    if (minRoomPrice < minPrice || minRoomPrice > maxPrice) return false;

    return true;
  });

  useEffect(() => {
    const fetchData = async () => {
      // 기존 페이지네이션 데이터 (AccommodationListBox)
      const params = {
        keyword,
        checkIn,
        checkOut,
        numberOfPeople,
        page: currentPage - 1,
        size: 10,
      };
      const data = await searchAccommodationByKeyword(params);
      setAccommodations(data);
    };

    const fetchAllData = async () => {
      // 전체 데이터 (KakaoMap)
      const params = {
        keyword,
        checkIn,
        checkOut,
        numberOfPeople,
        page: 0,
        size: 9999, 
      };
      const data = await searchAccommodationByKeyword(params);
      setAllAccommodations(data);
    };

    fetchData();
    fetchAllData();
  }, [currentPage, keyword, checkIn, checkOut, numberOfPeople]);
  
  return (
    <PageContainer>
      <div className='search-bar'>
      </div>
      <div className='main-section'>
        <aside className='filter-section accom-filter-section'>
          <MapButton
            accommodations={allAccommodations}
            filterHook={filterHook}
          />
          <FilterPanel
            className={'accom-filter-panel'}
            filterHook={filterHook}
          />
        </aside>
        <div className='list-section'>
          <AccommodationListBox
            accommodations={filteredAccommodations}
            filterHook={filterHook}
          />
          <Pagination
            className='accom-pagination'
            totalCount={500}
            pageLength={5}
            currentPage={currentPage}
            numOfRows={10}
            useMoveToEnd={true}
            onClick={(pageNo) => setCurrentPage(pageNo)}
          />
        </div>
      </div>
    </PageContainer>
  );
};
export default AccommodationList;
