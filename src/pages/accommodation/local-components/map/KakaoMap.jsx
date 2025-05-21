import { useEffect } from "react";

const { kakao } = window;

export const KakaoMap = ({ accommodations = [] }) => {
  useEffect(() => {
    const mapContainer = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567), // 서울 중심
      level: 5,
    };
    const map = new kakao.maps.Map(mapContainer, options);
    const geocoder = new kakao.maps.services.Geocoder();

    accommodations.forEach((acc) => {
      geocoder.addressSearch(acc.address, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          // 마커 생성
          const marker = new kakao.maps.Marker({
            map,
            position: coords,
          });

          const content = `
            <div style="padding:5px 10px; background:#5500ff; color:white; border-radius:6px; font-size:14px;">
              ₩${acc.price.toLocaleString()}
            </div>
          `;

          const overlay = new kakao.maps.CustomOverlay({
            content,
            position: coords,
            yAnchor: 1,
          });

          overlay.setMap(map);
        }
      });
    });
  }, [accommodations]);

  return (
    <div
      id="map"
      style={{
        width: "100%",
        height: "600px",
        border: "2px solid #baabfa",
        borderRadius: "8px",
      }}
    />
  );
};
