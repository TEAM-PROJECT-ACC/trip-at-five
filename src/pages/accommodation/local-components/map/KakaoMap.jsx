import { useEffect } from "react";
import "./KakaoMap.style.scss";

export const KakaoMap = () => {
  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) return;
    const { kakao } = window;

    const mapContainer = document.getElementById("map"),
      mapOptions = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567),
        level: 3,
      };

    const map = new kakao.maps.Map(mapContainer, mapOptions);
    const markerPosition = new kakao.maps.LatLng(37.566826, 126.9786567);

    const marker = new kakao.maps.Marker({ position: markerPosition });
    marker.setMap(map);
  }, []);

  return (
    <div className="container">
      <div id="map"></div>
    </div>
  );
};
