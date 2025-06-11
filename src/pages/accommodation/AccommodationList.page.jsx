import React from 'react';
import { useState, useEffect } from 'react';
import { Pagination } from '../../components/pagination/Pagination.component';
import FilterPanel from './local-components/filter/FilterPanel.component';
import MapButton from './local-components/map/MapButton.component';
import AccommodationListBox from './local-components/acc-items-box/AccommodationListBox.component';
import './accommodationList.style.scss';
import { PageContainer } from '../../components';
import { useAccomSearchStore } from '../../states';
import { useFilterStore } from '../../states/accom-filter/filterStore';
import { searchAccommodationByKeyword } from '../../services/accom/apiService';
import SearchArea from '../main/local-components/top/search/SearchArea.component';

/**
 * 바뀔수 있는 정렬 조건 => 가격높은/낮은순, 평점높은순
 * 필수 정렬 조건 => 숙박업소명
 */

const AccommodationList = () => {
  const keyword = useAccomSearchStore.getState().keyword;
  const checkIn = useAccomSearchStore.getState().checkIn;
  const checkOut = useAccomSearchStore.getState().checkOut;
  const numberOfPeople = useAccomSearchStore.getState().numberOfPeople;

  const {
    selectedCategory,
    selectedPub,
    selectedInroom,
    selectedEtc,
    priceRange,
  } = useFilterStore((state) => state);

  // 숙박목록용 데이터
  const [accommodations, setAccommodations] = useState([]);
  // 모달 안 목록용 데이터
  const [allAccommodations, setAllAccommodations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredAccommodations = accommodations.filter((item) => {
    if (selectedCategory && item.accomTypeNo !== selectedCategory) return false;

    const facilities = [
      ...(item.pubFacInfo ? item.pubFacInfo.split(',').map((f) => f.trim()) : []),
      ...(item.inRoomFacInfo ? item.inRoomFacInfo.split(',').map((f) => f.trim()) : []),
      ...(item.etcFacInfo ? item.etcFacInfo.split(',').map((f) => f.trim()) : []),
    ];

    const hasSelectedPub = selectedPub.every((f) => facilities.includes(f));
    const hasSelectedInroom = selectedInroom.every((f) => facilities.includes(f));
    const hasSelectedEtc = selectedEtc.every((f) => facilities.includes(f));

    if (!hasSelectedPub || !hasSelectedInroom || !hasSelectedEtc) return false;

    const minRoomPrice = item.roomPrice;
    if (minRoomPrice < priceRange[0] || minRoomPrice > priceRange[1]) return false;

    return true;
  });

  useEffect(() => {
    const fetchData = async () => {
      // 기존 페이지네이션 데이터 (AccommodationListBox)
      const params = {
        keyword,
        checkIn,
        checkOut,
        guests: numberOfPeople,
        page: currentPage - 1,
        size: 10,
        accomTypeNo: selectedCategory ? Number(selectedCategory) : null,
        selectedPub,
        selectedInroom,
        selectedEtc,
      };
      const data = await searchAccommodationByKeyword(params);
      console.log('notFetchData :', data);
      setAccommodations(data);
    };

    const fetchAllData = async () => {
      // 전체 데이터 (KakaoMap)
      const params = {
        keyword,
        checkIn,
        checkOut,
        guests: numberOfPeople,
        page: 0,
        size: 9999,
        accomTypeNo: selectedCategory ? Number(selectedCategory) : null,
        selectedPub,
        selectedInroom,
        selectedEtc,
      };
      const data = await searchAccommodationByKeyword(params);
      console.log('fetchAllData :', data);
      setAllAccommodations(data);
    };

    fetchData();
    fetchAllData();
  }, [currentPage, keyword, checkIn, checkOut, numberOfPeople, selectedCategory, selectedPub, selectedInroom, selectedEtc,]);

  return (
    <PageContainer>
      <div className='search-bar'>
        <SearchArea />
      </div>
      <div className='main-section'>
        <aside className='filter-section accom-filter-section'>
          <MapButton
            allAccommodations={allAccommodations}
          />
          <FilterPanel
            className={'accom-filter-panel'}
          />
        </aside>
        <div className='list-section'>
          <AccommodationListBox
            filteredAccommodations={filteredAccommodations}
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
