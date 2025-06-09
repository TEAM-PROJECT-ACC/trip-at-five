import { useEffect, useRef } from 'react';
import './kakaoMap.style.scss';
import FilterPanel from '../filter/FilterPanel.component';
import { MapInnerList } from '../acc-map-list/MapInnerList.component';
import { accomData } from '../../../../assets/sample-data/accomSampleData';
import { TiDelete } from '../../../../assets/icons/ys/index';
import Script from './Script';
import { useFilterState } from '../../hooks/useFilterState.hook';

export const KakaoMap = ({ onClose, accommodations }) => {
  const mapRef = useRef();
  const kakaoMap = useRef(null);

  const filterHook = useFilterState();
  const { filter } = filterHook;
  const { priceRange } = filter;

  const init = () => {
    const [minPrice, maxPrice] = priceRange;

    const mapContainer = mapRef.current;

    if (!window.kakao || !window.kakao.maps) return;

    if (!kakaoMap.current) {
      kakaoMap.current = new window.kakao.maps.Map(mapContainer, {
        /**
         * level 범위 1 ~ 14
         *
         * 단순 지역명일 경우
         * center : 중심지(시청, 도청) 위도, 경도 값으로 설정
         * level : 8
         *
         * 아닐 경우
         * center : 위도의 평균, 경도의 평균으로 설정
         *
         * 각 지역 기반 Group으로 묶고 평균 경도/위도 값을 각각 구한다.
         *
         * 평균을 기반으로 해서 평균의 평균 => 중심 좌표를 구한다.
         *
         * 중심좌표에서 각 지역의 중심좌표(각지역평균좌표) 까지의 거리를 측정한다. (지역 갯수만큼)
         *
         * 총 거리를 구하고 총거리 / 지역 갯수 => 최종 거리(km)
         *
         * 100km 이상 시 level은 11
         * 200km 이상 시 level은 12
         * 300km 이상 시 level은 13
         *
         * 처음 모든 숙박업소 정보가 로드가 되어야 함
         * 만약 마우스 클릭으로 이동했을 때 새로 로드된 데이터가 있다면
         * => 해당 km level은 증가
         *
         */
        center: new kakao.maps.LatLng(37.888862916, 127.3564676189),
        level: 8,
      });
    }
    const map = kakaoMap.current;

    document
      .querySelectorAll('.customoverlay-wrapper')
      .forEach((el) => el.remove());

    let openOverlayId = null;

    const filteredData = accomData.accommodation_tb
      .map((item) => {
        const lat = item.accom_lat;
        const lon = item.accom_lon;

        if (lat == null || lon == null) return null;
        const minRoomPrice = Math.min(
          ...item.rooms.map((room) => room.room_price)
        );
        if (minRoomPrice < minPrice || minRoomPrice > maxPrice) return null;
        return {
          id: item.accom_sq,
          name: item.accom_name,
          address: item.accom_location,
          rating: item.rooms.length * 100,
          checkIn: '15:00',
          checkOut: '11:00',
          price: minRoomPrice,
          lat,
          lon,
        };
      })
      .filter(Boolean);

    filteredData.forEach((accom, idx) => {
      console.log(accom);
      const position = new kakao.maps.LatLng(accom.lat, accom.lon);

      const container = document.createElement('div');
      container.className = 'customoverlay-wrapper';
      // container.style.zIndex = `${1000 + idx}`;

      container.innerHTML = `
          <div class="price-bubble">₩${accom.price.toLocaleString()}</div>
          <div class="text__box" data-id="${accom.name}">
            <button class="btn-close">X</button>
            <strong>${accom.name}</strong>
            <p class="address">${accom.address}</p>
            <p class="price">₩${accom.price.toLocaleString()}</p>
          </div>
        `;

      const box = container.querySelector('.text__box');
      box.style.opacity = '0';
      box.style.visibility = 'hidden';
      box.style.transition = 'all 0.3s ease';

      const overlay = new kakao.maps.CustomOverlay({
        position,
        content: container,
        yAnchor: 0.3,
        // zIndex: 1000 + idx,
      });

      overlay.setMap(map);

      const bubble = container.querySelector('.price-bubble');

      bubble.addEventListener('click', () => {
        document.querySelectorAll('.text__box').forEach((el) => {
          container.parentElement.style.zIndex = 0;

          el.style.opacity = '0';
          el.style.visibility = 'hidden';
        });

        // document.querySelectorAll('.price-bubble').forEach((el) => {
        //   el.style.zIndex = '101';
        // });
        if (openOverlayId === accom.id) {
          openOverlayId = null;
        } else {
          box.style.opacity = '1';
          box.style.visibility = 'visible';
          openOverlayId = accom.id;

          container.parentElement.style.zIndex = 1000;
        }
      });

      const button = container.querySelector('.btn-close');
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        container.parentElement.style.zIndex = 0;
        box.style.opacity = '0';
        box.style.visibility = 'hidden';
        openOverlayId = null;

        document.querySelectorAll('.price-bubble').forEach((el) => {
          el.style.opacity = '1';
          el.style.visibility = 'visible';
          el.style.pointerEvents = 'auto';
        });
      });
    });
  };
  const zoomIn = () => {
    const map = kakaoMap.current;
    if (map) map.setLevel(map.getLevel() - 1);
  };

  const zoomOut = () => {
    const map = kakaoMap.current;
    if (map) map.setLevel(map.getLevel() + 1);
  };

  useEffect(() => {
    if (window.kakao && window.kakao.maps && mapRef.current) {
      window.kakao.maps.load(() => {
        init();
      });
    }
  }, [mapRef.current, priceRange]);

  return (
    <div className='container'>
      <Script
        async
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${
          import.meta.env.VITE_KAKAO_JAVA_API
        }&autoload=false`}
        onLoad={() => {
          if (window.kakao && window.kakao.maps) {
            window.kakao.maps.load(() => {
              init();
            });
          }
        }}
      />

      <button
        className='btn-exit'
        type='button'
        onClick={onClose}
      >
        <TiDelete />
      </button>
      <div className='filter-map'>
        <FilterPanel filterHook={filterHook} />
      </div>
      <div className='acc-list-map'>
        <MapInnerList />
        <div
          className='map'
          ref={mapRef}
        ></div>
        <div className='custom_zoomcontrol'>
          <div
            className='level__btn--plus'
            onClick={zoomIn}
          >
            <img
              src='https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png'
              alt='확대'
            />
          </div>
          <div
            className='level__btn--minus'
            onClick={zoomOut}
          >
            <img
              src='https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png'
              alt='축소'
            />
          </div>
        </div>
      </div>
    </div>
  );
};
