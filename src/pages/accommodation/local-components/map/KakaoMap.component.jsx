import { useEffect, useRef } from "react";
import "./KakaoMap.style.scss";
import FilterPanel from "../filter/FilterPanel.component";
import { MapInnerList } from "../acc/MapInnerList.component";
import { TiDelete } from "../../../../assets/icons/ys/index";

export const KakaoMap = ({ onClose }) => {
  const mapRef = useRef();

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) return;

    window.kakao.maps.load(() => {
      const mapContainer = mapRef.current;
      if (!mapContainer) {
        console.error("Map container not found");
        return;
      }

      const mapOptions = {
        center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
        level: 3,
      };

      const map = new window.kakao.maps.Map(mapContainer, mapOptions);

      markedData.forEach((el) => {
        new window.kakao.maps.Marker({
          position: new kakao.maps.LatLng(el.lat, el.lng),
          map: map,
        });

        const overlayContent = document.createElement("div");
        overlayContent.innerText = el.content;
        overlayContent.style.cssText =
          "background:white; padding:5px; border:1px solid #333;";

        const customOverlay = new window.kakao.maps.CustomOverlay({
          content: overlayContent,
          position: marker.getPosition(),
          yAnchor: 1,
        });
      });

      customOverlay.setMap(map);
    });
  }, []);

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
      </div>
    </div>
  );
};
