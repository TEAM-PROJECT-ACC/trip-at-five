import { useEffect, useRef } from "react";
import "./KakaoMap.style.scss";
import FilterPanel from "../filter/FilterPanel.component";
import { MapInnerList } from "../acc/MapInnerList.component";
import { markedData } from "./mapMarker";
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
        new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(el.lat, el.lng),
          title: el.title,
        });
      });
      const marker = new window.kakao.maps.Marker({ position: markerPosition });
      marker.setMap(map);
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
