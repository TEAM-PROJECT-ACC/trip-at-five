import React from 'react';
import { useState } from 'react';
import { Pagination } from '../../components/pagination/Pagination.component';
import FilterPanel from './local-components/filter/FilterPanel.component';
import MapButton from './local-components/map/MapButton.component';
import AccommodationListBox from './local-components/acc-items-box/AccommodationListBox.component';
import './accommodationList.style.scss';
import { PageContainer } from '../../components';
import { accomData } from '../../assets/sample-data/accomSampleData';
import { useFilterState } from './hooks/useFilterState.hook';

const AccommodationList = () => {
  const filterHook = useFilterState();
  const { setCurrentPage, filter } = filterHook;
  const pageSize = 5;

  const [minPrice, maxPrice] = filter.priceRange;
  const currentPage = filter.currentPage;

  const accommodations = accomData.accommodation_tb
    .map((item) => {
      const minRoomPrice = Math.min(
        ...item.rooms.map((room) => room.room_price)
      );
      return {
        id: item.accom_sq,
        name: item.accom_name,
        address: item.accom_location,
        type: item.accom_type,
        rating: item.rooms.length * 100,
        checkIn: '15:00',
        checkOut: '11:00',
        price: minRoomPrice,
      };
    })
    .filter((item) => item.price >= minPrice && item.price <= maxPrice);
  const startIndex = (currentPage - 1) * pageSize;

  const currentPageData = accommodations.slice(
    startIndex,
    startIndex + pageSize
  );

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
            data={currentPageData}
            accommodations={accommodations}
            filterHook={filterHook}
          />
          <Pagination
            className='accom-pagination'
            totalCount={100}
            pageLength={5}
            currentPage={currentPage}
            numOfRows={10}
            useMoveToEnd={true}
            onClick={setCurrentPage}
          />
        </div>
      </div>
    </PageContainer>
  );
};

export default AccommodationList;
