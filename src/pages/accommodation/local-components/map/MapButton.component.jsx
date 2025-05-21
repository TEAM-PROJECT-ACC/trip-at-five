import { KakaoMap } from "./KakaoMap";
import { useState } from "react";
import "./MapButton.style.scss";

const accommodations = [
  {
    id: 1,
    title: "서울 호텔",
    address: "서울특별시 중구 세종대로 110",
    price: 120000,
  },
  {
    id: 2,
    title: "강남 리조트",
    address: "서울특별시 강남구 테헤란로 212",
    price: 98000,
  },
];

const MapButton = () => {
  const [showMap, setShowMap] = useState(false);

  return (
    <div className="map-button">
      <button className="map-btn-text" onClick={() => setShowMap(true)}>
        지도보기
      </button>
      {showMap && <KakaoMap accommodations={accommodations} />}
    </div>
  );
};
export default MapButton;
