import { useEffect, useRef } from "react";
import "./KakaoMap.style.scss";
import FilterPanel from "../filter/FilterPanel.component";
import { MapInnerList } from "../acc-map-list/MapInnerList.component";
import { markedData } from "./MapData";
import { TiDelete } from "../../../../assets/icons/ys/index";

export const KakaoMap = ({ onClose }) => {
  const mapRef = useRef();
  const kakaoMap = useRef(null);
  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) return;

    window.kakao.maps.load(() => {
      const mapContainer = mapRef.current;
      if (!mapContainer) {
        console.error("Map container not found");
        return;
      }

      const map = new window.kakao.maps.Map(mapContainer, {
        center: new kakao.maps.LatLng(37.566826, 126.9786567),
        level: 3,
      });

      kakaoMap.current = map;

      markedData.forEach((el) => {
        const position = new kakao.maps.LatLng(el.lat, el.lng);

        const marker = new kakao.maps.Marker({
          position,
          map,
        });

        const overlayContent = document.createElement("div");
        overlayContent.innerText = el.name;
        overlayContent.style.cssText = `
          background: #fafafa;
          border: 1px solid #5500ff;
          padding: 16px 24px;
          border-radius: 3px;
          font-size: 12px;
          margin-top: 120px;
          white-space: nowrap;
          box-shadow: 3px 3px 2px 0px rgb(0, 0, 0, 0.5);
          z-index: 111;
        `;

        const overlay = new kakao.maps.CustomOverlay({
          content: overlayContent,
          position,
          yAnchor: 1.2,
        });
        kakao.maps.event.addListener(marker, "mouseover", () => {
          overlay.setMap(map);
        });

        kakao.maps.event.addListener(marker, "mouseout", () => {
          overlay.setMap(null);
        });
      });
    });
  }, []);

  const zoomIn = () => {
    const map = kakaoMap.current;
    if (map) map.setLevel(map.getLevel() - 1);
  };

  const zoomOut = () => {
    const map = kakaoMap.current;
    if (map) map.setLevel(map.getLevel() + 1);
  };
  return (
    <div className="container">
      <button className="btn-exit" onClick={onClose}>
        <TiDelete />
      </button>
      <div id="filter">
        <FilterPanel />
      </div>
      <div id="acc-list">
        <MapInnerList />
        <div id="map" ref={mapRef}></div>
        <div className="custom_zoomcontrol">
          <div id="level__btn--plus" onClick={zoomIn}>
            <img
              src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png"
              alt="확대"
            />
          </div>
          <div id="level__btn--minus" onClick={zoomOut}>
            <img
              src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png"
              alt="축소"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
