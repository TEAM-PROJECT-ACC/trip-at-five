import React from "react";
import { useState, useEffect } from "react";
import { showAccomodationList } from "../../services/apiService";
//import { VITE_KAKAO_JAVA_API } from "./env.config";
import FilterPanel from "./local-components/filter/FilterPanel.component";
import MapButton from "./local-components/map/MapButton.component";
import "./AccommodationList.style.scss";

const AccommodationList = () => {
  const [accommodations, setAccommodations] = useState([]);
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

  return (
    <div className="accom-page">
      <div className="search-bar"></div>
      <div className="main-section">
        <aside className="filter-section">
          <MapButton accommodations={accommodations} />
          <FilterPanel />
        </aside>
        <div className="list-section">
          <AccommodationList />
        </div>
      </div>
    </div>
  );
};

export default AccommodationList;
