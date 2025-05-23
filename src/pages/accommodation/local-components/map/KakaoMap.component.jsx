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

    const initializeMap = () => {
      const mapContainer = mapRef.current;

      const map = new window.kakao.maps.Map(mapContainer, {
        center: new kakao.maps.LatLng(37.566826, 126.9786567),
        level: 3,
      });

      kakaoMap.current = map;

      setTimeout(() => {
        map.relayout();
      });

      let openOverlayId = null;

      markedData.forEach((accom, idx) => {
        const position = new kakao.maps.LatLng(accom.lat, accom.lng);

        const container = document.createElement("div");
        container.className = "customoverlay-wrapper";

        container.innerHTML = `
          <div class="price-bubble">₩${accom.price.toLocaleString()}</div>
          <div class="text__box" data-id="${accom.id}">
            <button class="btn-close">X</button>
            <strong>${accom.name}</strong>
            <p class="address">${accom.address}</p>
            <p class="price">₩${accom.price.toLocaleString()}</p>
          </div>
        `;
        const box = container.querySelector(".text__box");
        box.style.opacity = "0";
        box.style.visibility = "hidden";
        box.style.transition = "all 0.3s ease";

        const overlay = new kakao.maps.CustomOverlay({
          position,
          content: container,
          yAnchor: 1,
          zIndex: 3 + idx,
        });

        overlay.setMap(map);

        const bubble = container.querySelector(".price-bubble");

        bubble.addEventListener("click", () => {
          document.querySelectorAll(".text__box").forEach((el) => {
            el.style.opacity = "0";
            el.style.visibility = "hidden";
          });
          document.querySelectorAll(".price-bubble").forEach((el) => {
            el.style.opacity = "0";
            el.style.visibility = "hidden";
            el.style.pointerEvents = "none";
          });
          if (openOverlayId === accom.id) {
            openOverlayId = null;
          } else {
            box.style.opacity = "1";
            box.style.visibility = "visible";
            openOverlayId = accom.id;
          }
        });

        const button = container.querySelector(".btn-close");
        button.addEventListener("click", (e) => {
          e.stopPropagation();
          box.style.opacity = "0";
          box.style.visibility = "hidden";
          openOverlayId = null;

          document.querySelectorAll(".price-bubble").forEach((el) => {
            el.style.opacity = "1";
            el.style.visibility = "visible";
            el.style.pointerEvents = "auto";
          });
        });
      });
    };

    if (window.kakao?.maps?.load) {
      window.kakao.maps.load(() => {
        initializeMap();
      });
    } else if (window.kakao?.maps) {
      initializeMap();
    }
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
