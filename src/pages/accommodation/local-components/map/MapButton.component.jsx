import { KakaoMap } from "./KakaoMap";
import { useState } from "react";
import "./MapButton.style.scss";

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
