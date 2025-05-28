import { useEffect, useRef } from 'react';
import './kakaoMap.style.scss';
import FilterPanel from '../filter/FilterPanel.component';
import { MapInnerList } from '../acc-map-list/MapInnerList.component';
import { accomData } from '../../../../assets/sample-data/accomSampleData';
import { TiDelete } from '../../../../assets/icons/ys/index';
import Script from './Script';
import { useFilterState } from '../../hooks/useFilterState.hook';

export const KakaoMap = ({ onClose }) => {
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
        center: new kakao.maps.LatLng(37.566826, 126.9786567),
        level: 3,
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
      container.style.zIndex = `${1000 + idx}`;

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
        zIndex: 1000 + idx,
      });

      overlay.setMap(map);

      const bubble = container.querySelector('.price-bubble');

      bubble.addEventListener('click', () => {
        document.querySelectorAll('.text__box').forEach((el) => {
          el.style.opacity = '0';
          el.style.visibility = 'hidden';
        });

        document.querySelectorAll('.price-bubble').forEach((el) => {
          el.style.zIndex = '101';
        });
        if (openOverlayId === accom.id) {
          openOverlayId = null;
        } else {
          box.style.opacity = '1';
          box.style.visibility = 'visible';
          openOverlayId = accom.id;
        }
      });

      const button = container.querySelector('.btn-close');
      button.addEventListener('click', (e) => {
        e.stopPropagation();
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
