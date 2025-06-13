import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { Pagination } from '../../components/pagination/Pagination.component';
import FilterPanel from './local-components/filter/FilterPanel.component';
import MapButton from './local-components/map/MapButton.component';
import AccommodationListBox from './local-components/acc-items-box/AccommodationListBox.component';
import './accommodationList.style.scss';
import { PageContainer } from '../../components';
import { useAccomSearchStore } from '../../states';
import { useFilterStore } from '../../states/accom-filter/filterStore';
import { searchAccommodationByKeyword } from '../../services/accom/accomService.api';
import SearchArea from '../main/local-components/top/search/SearchArea.component';

/**
 * 바뀔수 있는 정렬 조건 => 가격높은/낮은순, 평점높은순
 * 필수 정렬 조건 => 숙박업소명
 */

const PAGE_SIZE = 10;
const PAGE_LENGTH = 5;

const AccommodationList = () => {
  const searchState = useAccomSearchStore((state) => state);
  const filterState = useFilterStore((state) => state);

  const resetFilters = useFilterStore((state) => state.resetFilters);

  // 숙박목록용 데이터
  const [allAccommodations, setAllAccommodations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredAccommodations = useMemo(() => {
    return allAccommodations.filter((item) => {
      // 숙박 유형 카테고리
      if (
        filterState.selectedCategory &&
        item.accomTypeNo !== filterState.selectedCategory
      )
        return false;
      // 시설
      const facilities = [
        ...(item.pubFacInfo
          ? item.pubFacInfo.split(',').map((f) => f.trim())
          : []),
        ...(item.inRoomFacInfo
          ? item.inRoomFacInfo.split(',').map((f) => f.trim())
          : []),
        ...(item.etcFacInfo
          ? item.etcFacInfo.split(',').map((f) => f.trim())
          : []),
      ];
      if (!filterState.selectedPub.every((f) => facilities.includes(f)))
        return false;
      if (!filterState.selectedInroom.every((f) => facilities.includes(f)))
        return false;
      if (!filterState.selectedEtc.every((f) => facilities.includes(f)))
        return false;
      // 가격
      const minRoomPrice = item.roomPrice;
      if (
        minRoomPrice < filterState.priceRange[0] ||
        minRoomPrice > filterState.priceRange[1]
      )
        return false;
      return true;
    });
  }, [allAccommodations, filterState]);

  const pagedAccommodations = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredAccommodations.slice(start, start + PAGE_SIZE);
  }, [filteredAccommodations, currentPage]);

  const onClickHandler = (pageNo) => {
    setCurrentPage(pageNo);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchAllData = async () => {
      const params = {
        keyword: searchState.keyword,
        checkIn: searchState.checkIn,
        checkOut: searchState.checkOut,
        guests: searchState.numberOfPeople,
        page: 0,
        size: 9999,
        accomTypeNo: filterState.selectedCategory
          ? Number(filterState.selectedCategory)
          : null,
        selectedPub: filterState.selectedPub,
        selectedInroom: filterState.selectedInroom,
        selectedEtc: filterState.selectedEtc,
        minPrice: filterState.priceRange[0],
        maxPrice: filterState.priceRange[1],
      };
      const data = await searchAccommodationByKeyword(params);
      //console.log('fetchAllData :', data);
      setAllAccommodations(data);
      setCurrentPage(1);
    };
    fetchAllData();
  }, [
    currentPage,
    searchState.keyword,
    searchState.checkIn,
    searchState.checkOut,
    searchState.numberOfPeople,
    filterState,
  ]);

  useEffect(() => {
    resetFilters();
    setCurrentPage(1);
  }, [searchState.keyword]);
  return (
    <PageContainer>
      <div className='search-bar'>
        <SearchArea />
      </div>
      <div className='main-section'>
        <aside className='filter-section accom-filter-section'>
          <MapButton allAccommodations={allAccommodations} />
          <FilterPanel className={'accom-filter-panel'} />
        </aside>
        <div className='list-section'>
          <AccommodationListBox filteredAccommodations={pagedAccommodations} />
          <Pagination
            className='accom-pagination'
            totalCount={filteredAccommodations.length}
            pageLength={PAGE_LENGTH}
            currentPage={currentPage}
            numOfRows={PAGE_SIZE}
            useMoveToEnd={true}
            onClick={onClickHandler}
          />
        </div>
      </div>
    </PageContainer>
  );
};
export default AccommodationList;
