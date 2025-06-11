import { useEffect, useRef } from 'react';
import './kakaoMap.style.scss';
import FilterPanel from '../filter/FilterPanel.component';
import { MapInnerList } from '../acc-map-list/MapInnerList.component';
import { TiDelete } from '../../../../assets/icons/ys/index';
import Script from './Script';
import { useFilterState } from '../../hooks/useFilterState.hook';
import { useAccomSearchStore } from '../../../../states';
import { shallow } from 'zustand/shallow';
import { useNavigate } from 'react-router-dom';

export const KakaoMap = ({ onClose, accommodations }) => {
  const mapRef = useRef();
  const kakaoMap = useRef(null);
  const navigate = useNavigate();

  const filterHook = useFilterState();
  const { filter } = filterHook;
  const { priceRange,selectedCategory, selectedFacilities } = filter;

  const keyword = useAccomSearchStore.getState().keyword;

  // 단순 지역명일 경우 중심지(시청, 도청) 위도, 경도으로 설정
  const regionCenters = {
    서울특별시: { lat: 37.5665, lon: 126.978, locId: 11 },
    부산광역시: { lat: 35.1796, lon: 129.0756, locId: 26 },
    대구광역시: { lat: 35.8714, lon: 128.6014, locId: 27 },
    인천광역시: { lat: 37.4563, lon: 126.7052, locId: 28 },
    광주광역시: { lat: 35.1595, lon: 126.8526, locId: 29 },
    대전광역시: { lat: 36.3504, lon: 127.3845, locId: 30 },
    울산광역시: { lat: 35.5384, lon: 129.3114, locId: 31 },
    경기도: { lat: 37.4138, lon: 127.5183, locId: 41 },
    충청북도: { lat: 36.6357, lon: 127.4917, locId: 43 },
    충청남도: { lat: 36.5184, lon: 126.8, locId: 44 },
    전라남도: { lat: 34.8161, lon: 126.463, locId: 46 },
    경상북도: { lat: 36.5756, lon: 128.5056, locId: 47 },
    경상남도: { lat: 35.4606, lon: 128.2132, locId: 48 },
    제주특별자치도: { lat: 33.4996, lon: 126.5312, locId: 50 },
    강원특별자치도: { lat: 37.8228, lon: 128.1555, locId: 51 },
    전북특별자치도: { lat: 35.82, lon: 127.1088, locId: 52 },
    세종특별자치시: { lat: 36.48, lon: 127.289, locId: 36110 },
  };
  const filteredAccommodations = accommodations.filter(item => {
    // 카테고리
    if (selectedCategory && item.accomTypeNo !== selectedCategory) return false;
    // 시설
    if (selectedFacilities.length > 0) {
      const allFacilities = [
        ...(item.pubFacInfo ? item.pubFacInfo.split(',').map(f => f.trim()) : []),
        ...(item.inRoomFacInfo ? item.inRoomFacInfo.split(',').map(f => f.trim()) : []),
        ...(item.etcFacInfo ? item.etcFacInfo.split(',').map(f => f.trim()) : []),
      ];
      const hasAllSelected = selectedFacilities.every(facility => allFacilities.includes(facility));
      if (!hasAllSelected) return false;
    }
    // 가격
    const [minPrice, maxPrice] = priceRange;
    const minRoomPrice = item.roomPrice;
    if (minRoomPrice < minPrice || minRoomPrice > maxPrice) return false;

    return true;
  });

  const calculateMapCenterLevel = (accommodations, keyword) => {
    const regionNames = accommodations.map((item) =>
      item.accomAddr ? item.accomAddr.split(' ')[0] : null
    );
    
    for (const regionName of regionNames) {
      if (regionName && regionCenters[regionName]) {
        if (regionName === keyword) {
          const region = regionCenters[regionName];
          return { centerLat: region.lat, centerLon: region.lon, mapLevel: 9 };
        }
      }
    }
    
   const groupByLocation = {};
    accommodations.forEach((item) => {
      if (item.locId !== null) {
        groupByLocation[item.locId] = groupByLocation[item.locId] || [];
        groupByLocation[item.locId].push(item);
      }
    });

   const locIds = Object.keys(groupByLocation);

    if (locIds.length === 1) {
      const regionAccoms = groupByLocation[locIds[0]];
      const sumLat = regionAccoms.reduce((sum, curr) => sum + curr.accomLat, 0);
      const sumLon = regionAccoms.reduce((sum, curr) => sum + curr.accomLon, 0);

      const avgLat = sumLat / regionAccoms.length;
      const avgLon = sumLon / regionAccoms.length;

      console.log('Single region:', avgLat, avgLon);

      return { centerLat: avgLat, centerLon: avgLon, mapLevel: 10 };
    }

    // 지역 평균 위도 경도 계산
    const regionCenterLonLat = [];
    locIds.forEach((locId) => {
      const regionAccoms = groupByLocation[locId];
      const sumLat = regionAccoms.reduce((sum, curr) => sum + curr.accomLat, 0); // sum 초기값=0
      const sumLon = regionAccoms.reduce((sum, curr) => sum + curr.accomLon, 0);

      const avgLat = sumLat / regionAccoms.length;
      const avgLon = sumLon / regionAccoms.length;

      regionCenterLonLat.push([avgLat, avgLon]);
    });

    const sumCenterLat = regionCenterLonLat.reduce(
      (sum, curr) => sum + curr[0],
      0
    );

    const sumCenterLon = regionCenterLonLat.reduce(
      (sum, curr) => sum + curr[1],
      0
    );

    // 평균 위경도 값 = 중심 좌표
    const centerLat = sumCenterLat / regionCenterLonLat.length;
    const centerLon = sumCenterLon / regionCenterLonLat.length;

    console.log("CenterLat:", centerLat, "CenterLon:", centerLon);

    const distances = regionCenterLonLat.map((region) =>
      getDistance(centerLat, centerLon, region[0], region[1])
    );

    const avgDistance = distances.length > 0
    ? distances.reduce((sum, dis) => sum + dis, 0) / distances.length
    : 0;
    console.log("Average Distance (km):", avgDistance);

    let mapLevel = 9;
    if (avgDistance >= 150) mapLevel = 13;
    else if (avgDistance >= 100 && avgDistance < 150) mapLevel = 12;

    console.log("Calculated mapLevel:", mapLevel);

    return { centerLat, centerLon, mapLevel };
  };
  /*
    a : 두 점 간의 대원거리의 중간 계산값
    c : 대원거리(라디안)
    R : 지구 반지름
    R*c : 최종 거리리
  */
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371.0;
    // 위도/경도의 차이를 라디안으로 계산한 값
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };
  
  const init = () => {
    const [minPrice, maxPrice] = priceRange;

    const mapContainer = mapRef.current;

    if (!window.kakao || !window.kakao.maps) return;
 
    const { centerLat, centerLon, mapLevel } = calculateMapCenterLevel(
      filteredAccommodations,
      keyword
    );

    if (!kakaoMap.current) {
      kakaoMap.current = new window.kakao.maps.Map(mapContainer, {
        /**
         * level 범위 8 ~ 14
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
        center: new kakao.maps.LatLng(centerLat, centerLon),
        level: mapLevel,
      });
    }
    const map = kakaoMap.current;

    document
      .querySelectorAll('.customoverlay-wrapper')
      .forEach((el) => el.remove());

    let openOverlayId = null;

    const filteredData = filteredAccommodations
      .map((item) => {
        const lat = item.accomLat;
        const lon = item.accomLon;

        if (lat == null || lon == null) return null;

        const minRoomPrice = item.roomPrice;

        if (minRoomPrice < minPrice || minRoomPrice > maxPrice) return null;

        return {
          id: item.accomSq,
          name: item.accomName,
          address: item.accomAddr,
          checkIn: item.roomChkIn,
          checkOut: item.roomChkOut,
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

      box.addEventListener('click', (e) => {
        e.stopPropagation();
        navigate(`/accommodations/${accom.id}`);  
      });

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
  }, [mapRef.current, priceRange, selectedCategory, selectedFacilities]);

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
        <MapInnerList accommodations={filteredAccommodations} />
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
