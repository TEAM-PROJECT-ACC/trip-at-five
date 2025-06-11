import React from 'react';
import { useState, useEffect } from 'react';
import { Pagination } from '../../components/pagination/Pagination.component';
import FilterPanel from './local-components/filter/FilterPanel.component';
import MapButton from './local-components/map/MapButton.component';
import AccommodationListBox from './local-components/acc-items-box/AccommodationListBox.component';
import './accommodationList.style.scss';
import { PageContainer } from '../../components';
//import { accomData } from '../../assets/sample-data/accomSampleData';
import { useFilterState } from './hooks/useFilterState.hook';
import { useAccomSearchStore } from '../../states';
import { formatDateForApi } from '../../utils/formatDate/formatDate';
import { searchAccommodationByKeyword } from '../../services/accom/apiService';
//import { formatDate } from '../../utils/formatDate/formatDate';
/**
 * 바뀔수 있는 정렬 조건 => 가격높은/낮은순, 평점높은순
 * 필수 정렬 조건 => 숙박업소명
 */

const AccommodationList = () => {
  const filterHook = useFilterState();
  const { setCurrentPage, filter } = filterHook;

  const pageSize = 10;

  const [accommodations, setAccommodations] = useState([]);

  const { currentPage } = filter;

  const [minPrice, maxPrice] = filter.priceRange;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { keyword, checkIn, checkOut, tripDay, numberOfPeople } =
          useAccomSearchStore.getState();

        const params = {
          keyword,
          checkIn: formatDateForApi(checkIn),
          checkOut: formatDateForApi(checkOut),
          guests: numberOfPeople,
          page: currentPage - 1,
          size: pageSize,
        };

        const data = await searchAccommodationByKeyword(params);
        setAccommodations(data);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error('숙박업소 데이터를 불러오는데 실패했습니다.', error);
      }
    };

    fetchData();
  }, [currentPage]);

  return (
    <PageContainer>
      <div className='search-bar'></div>
      <div className='main-section'>
        <aside className='filter-section accom-filter-section'>
          <MapButton accommodations={accommodations} />
          <FilterPanel
            className={'accom-filter-panel'}
            filterHook={filterHook}
          />
        </aside>
        <div className='list-section'>
          <AccommodationListBox
            accommodations={accommodations}
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
