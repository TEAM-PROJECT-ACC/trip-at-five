import React from "react";
import { useState, useEffect } from "react";
//import { showAccomodationList } from "../../services/apiService";
import { Pagination } from "../../components/pagination/Pagination.component";
//import { VITE_KAKAO_JAVA_API } from "./env.config";
import FilterPanel from "./local-components/filter/FilterPanel.component";
import MapButton from "./local-components/map/MapButton.component";
import AccommodationListBox from "./local-components/acc-items-box/AccommodationListBox.component";
//import AccommodationItem from "./local-components/AccommodationItem.component";
import "./AccommodationList.style.scss";
import { PageContainer } from "../../components";
import { accomData } from "../../assets/sample-data/accomSampleData";

const AccommodationList = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const accommodations = accomData.accommodation_tb.map((item) => {
    return {
      id: item.accom_sq,
      name: item.accom_name,
      address: item.accom_location,
      rating: item.rooms.length*100,
      checkIn: "15:00",
      checkOut: "11:00",
      price: Math.min(...item.rooms.map((room) => room.room_price)),
    }
  })
  /*
  useEffect(() => {
    const getAccommodations = async () => {
      try {
        const data = await showAccomodationList();
        setAccommodations(data);
      } catch (error) {
        console.log("숙박정보 가져오기를 실패했습니다", error);
      }
    };
    getAccommodations();
  }, []);
  */
  const startIndex = (currentPage - 1) * pageSize;
  
  const currentPageData = accommodations.slice(
    startIndex,
    startIndex + pageSize
  );

  return (
    <PageContainer>
      <div className="search-bar"></div>
      <div className="main-section">
        <aside className="filter-section">
          <MapButton accommodations={accommodations} />
          <FilterPanel />
        </aside>
        <div className="list-section">
          <AccommodationListBox data={currentPageData} />
          <Pagination
            className="accom-pagination"
            totalCount={100}
            pageLength={5}
            currentPage={currentPage}
            numOfRows={10}
            useMoveToEnd={true}
            onClick={(pageNo) => {
              setCurrentPage(pageNo);
              console.log("선택된 페이지 번호:", pageNo);
            }}
          />
        </div>
      </div>
    </PageContainer>
  );
};

export default AccommodationList;
