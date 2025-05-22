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

const AccommodationList = () => {
  const sampleData = [
    {
      name: "서울신라호텔",
      address: "서울 장충동2가 202",
      rating: 1999,
      checkIn: "15:00",
      checkOut: "11:00",
      price: 150000,
    },
    {
      name: "강릉로뎀나무펜션",
      address: "강릉시 안현로",
      rating: 123,
      checkIn: "14:00",
      checkOut: "11:00",
      price: 90000,
    },
    {
      name: "서울신라호텔",
      address: "서울 장충동2가 202",
      rating: 1999,
      checkIn: "15:00",
      checkOut: "11:00",
      price: 150000,
    },
    {
      name: "강릉로뎀나무펜션",
      address: "강릉시 안현로",
      rating: 123,
      checkIn: "14:00",
      checkOut: "11:00",
      price: 90000,
    },
    {
      name: "서울신라호텔",
      address: "서울 장충동2가 202",
      rating: 1999,
      checkIn: "15:00",
      checkOut: "11:00",
      price: 150000,
    },
    {
      name: "샘플",
      address: "서울 장충동2가 202",
      rating: 1999,
      checkIn: "15:00",
      checkOut: "11:00",
      price: 150000,
    },
    {
      name: "샘플",
      address: "강릉시 안현로",
      rating: 123,
      checkIn: "14:00",
      checkOut: "11:00",
      price: 90000,
    },
    {
      name: "샘플",
      address: "서울 장충동2가 202",
      rating: 1999,
      checkIn: "15:00",
      checkOut: "11:00",
      price: 150000,
    },
    {
      name: "샘플",
      address: "서울 장충동2가 202",
      rating: 1999,
      checkIn: "15:00",
      checkOut: "11:00",
      price: 150000,
    },
    {
      name: "샘플",
      address: "강릉시 안현로",
      rating: 123,
      checkIn: "14:00",
      checkOut: "11:00",
      price: 90000,
    },
    {
      name: "샘플",
      address: "서울 장충동2가 202",
      rating: 1999,
      checkIn: "15:00",
      checkOut: "11:00",
      price: 150000,
    },
  ];
  //const [accommodations, setAccommodations] = useState([]);
  const [accommodations] = useState(sampleData);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

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
    <div className="accom-page">
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
    </div>
  );
};

export default AccommodationList;
