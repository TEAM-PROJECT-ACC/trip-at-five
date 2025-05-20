import { KakaoMap } from "./KakaoMap";

const MapButton = () => {
  return (
    <div className="map-button">
      <button
        onClick={() => {
          <KakaoMap />;
        }}
      >
        지도보기
      </button>
    </div>
  );
};
export default MapButton;
