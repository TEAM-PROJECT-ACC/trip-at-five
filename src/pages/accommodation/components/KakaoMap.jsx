import React, { useEffect, useRef } from "react";

const { kakao } = window;

export const KakaoMap = () => {
  useEffect(() => {
    const mapContainer = document.getElementById("map");
    const position = new kakao.maps.LatLng(33.450701, 126.570667);
    const options = {
      center: position,
      level: 3,
    };
    const map = new kakao.maps.Map(mapContainer, options);

    var marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(37.56682, 126.97865),
      map: map,
    });
  }, []);

  return <div id="map" style={{ width: "500px", height: "500px" }}></div>;
};
