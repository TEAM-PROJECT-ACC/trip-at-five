import React from "react";
import { useState, useEffect } from "react";
import { showAccomodationList } from "../../services/apiService";
//import { VITE_KAKAO_JAVA_API } from "./env.config";
import FilterPanel from "./components/FilterPanel.component";
import MapButton from "./components/MapButton.component";
import AccommodationItem from "./components/AccommodationItem.component";

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
          <h3>Map</h3>
          <MapButton />
          <FilterPanel />
        </aside>
        <section className="list-section">
          <ul className="accommodation-list">
            <li className="accommodation-item">
              <img src="" alt=""></img>
            </li>
            <li className="accommodation-item"></li>
            <li className="accommodation-item"></li>
            <li className="accommodation-item"></li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AccommodationList;
