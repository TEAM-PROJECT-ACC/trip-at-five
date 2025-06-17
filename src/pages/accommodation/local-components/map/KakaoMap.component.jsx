import { useEffect, useRef, useMemo } from 'react';
import './kakaoMap.style.scss';
import FilterPanel from '../filter/FilterPanel.component';
import { MapInnerList } from '../acc-map-list/MapInnerList.component';
import { TiDelete } from '../../../../assets/icons/ys/index';
import Script from './Script';
import { useAccomSearchStore } from '../../../../states';
import { useFilterStore } from '../../../../states/accom-filter/filterStore';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../../../../components';

// 검색 결과 데이터 없는 경우에 지도에서 보여줄 위경도값
const DEFAULT_CENTER = { lat: 37.579617, lon: 126.977041, mapLevel: 6 };

export const KakaoMap = ({ onClose, allAccommodations }) => {
  const mapRef = useRef();
  const kakaoMap = useRef(null);
  const navigate = useNavigate();

  const filterState = useFilterStore((state) => state);

  const keywordState = useAccomSearchStore((state) => state);

  // 모달 밖으로 나가면 필터 초기화
  const handleClose = () => {
    filterState.resetFilters();
    onClose();
  };

  // 필터 기능
  const filteredAccommodations = useMemo(() => {
    return allAccommodations.filter((item) => {
      if (
        keywordState.keyword &&
        !item.accomName?.includes(keywordState.keyword) &&
        !item.accomAddr?.includes(keywordState.keyword)
      ) {
        return false;
      }

      if (
        filterState.selectedCategory &&
        Number(item.accomTypeNo) !== Number(filterState.selectedCategory)
      )
        return false;

      const facilities = [
        ...(item.pubFacInfo
          ? item.pubFacInfo.split(',').map((f) => f.trim())
          : []),
        ...(item.inRoomFacInfo
          ? item.inRoomFacInfo.split(',').map((f) => f.trim())
          : []),
        ...(item.etcFacInfo
          ? item.etcFacInfo.split(',').map((f) => f.trim())
          : []),
      ];
      if (!filterState.selectedPub.every((f) => facilities.includes(f)))
        return false;
      if (!filterState.selectedInroom.every((f) => facilities.includes(f)))
        return false;
      if (!filterState.selectedEtc.every((f) => facilities.includes(f)))
        return false;

      const minRoomPrice = item.roomPrice;
      if (
        minRoomPrice < filterState.priceRange[0] ||
        minRoomPrice > filterState.priceRange[1]
      )
        return false;

      return true;
    });
  }, [allAccommodations, keywordState.keyword, filterState]);

  const calculateMapCenterLevel = (accommodations) => {
    if (!accommodations.length) {
      // 데이터 없는 경우
      return {
        centerLat: DEFAULT_CENTER.lat,
        centerLon: DEFAULT_CENTER.lon,
        mapLevel: DEFAULT_CENTER.mapLevel,
      };
    }

    const groupByLocation = {};
    accommodations.forEach((item) => {
      if (item.locId != null) {
        groupByLocation[item.locId] = groupByLocation[item.locId] || [];
        groupByLocation[item.locId].push(item);
      }
    });
    const locIds = Object.keys(groupByLocation);

    // 단일 지역만 있을 때
    if (locIds.length === 1) {
      const regionAccoms = groupByLocation[locIds[0]];

      // 최소 위경도, 최대 위경도 값을 기준으로 사각형이 있다고 가정하여
      const minX = Math.min(...regionAccoms.map((curr) => curr.accomLat));
      const maxX = Math.max(...regionAccoms.map((curr) => curr.accomLat));
      const minY = Math.min(...regionAccoms.map((curr) => curr.accomLon));
      const maxY = Math.max(...regionAccoms.map((curr) => curr.accomLon));
      const width = maxX - minX;
      const height = maxY - minY;

      // 중심 좌표 계산
      const centerX = minX + width / 2;
      const centerY = minY + height / 2;

      console.log('단일 지역:', locIds[0], '평균 좌표:', centerX, centerY);

      // 최대 거리 계산
      const distances = regionAccoms.map((accom) =>
        getDistance(centerX, centerY, accom.accomLat, accom.accomLon)
      );
      const maxDistance = distances.length > 0 ? Math.max(...distances) : 0;
      console.log('최대거리 (km):', maxDistance.toFixed(2) + 'km');

      // 단일 지역: 맵 레벨 지정 최대 거리로
      let mapLevel = 5;
      if (maxDistance >= 0.01 && maxDistance < 5) mapLevel = 6;
      else if (maxDistance >= 5 && maxDistance < 12) mapLevel = 8;
      else if (maxDistance >= 12 && maxDistance <= 30) mapLevel = 9;
      else if (maxDistance > 30 && maxDistance < 100) mapLevel = 10;
      else mapLevel = 11;

      console.log('단일 맵레벨:', mapLevel);
      return { centerLat: centerX, centerLon: centerY, mapLevel };
    }

    // 여러 지역일 때
    const regionCenters = locIds.map((locId) => {
      const regionAccoms = groupByLocation[locId];
      const avgLat =
        regionAccoms.reduce((sum, curr) => sum + curr.accomLat, 0) /
        regionAccoms.length;
      const avgLon =
        regionAccoms.reduce((sum, curr) => sum + curr.accomLon, 0) /
        regionAccoms.length;
      return { locId, avgLat, avgLon };
    });
    const centerLat =
      regionCenters.reduce((sum, c) => sum + c.avgLat, 0) /
      regionCenters.length;
    const centerLon =
      regionCenters.reduce((sum, c) => sum + c.avgLon, 0) /
      regionCenters.length;
    const distances = regionCenters.map((region) =>
      getDistance(centerLat, centerLon, region.avgLat, region.avgLon)
    );

    const avgDistance = distances.length
      ? distances.reduce((a, b) => a + b) / distances.length
      : 0;
    console.log('여러 지역 평균 거리 (km):', avgDistance);

    let mapLevel = 11;
    if (avgDistance >= 100 && avgDistance < 150) mapLevel = 12;
    else if (avgDistance >= 150) mapLevel = 13;

    console.log('여러 지역 맵 레벨:', mapLevel);
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
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    console.log(
      `%c ${lat1}, ${lon1} :: ${lat2}, ${lon2} ---- ${R * c}`,
      'color:red;background:lightgreen'
    );

    return R * c;
  };

  const init = () => {
    const [minPrice, maxPrice] = filterState.priceRange;

    const mapContainer = mapRef.current;

    if (!window.kakao || !window.kakao.maps) return;

    const { centerLat, centerLon, mapLevel } = calculateMapCenterLevel(
      filteredAccommodations,
      keywordState.keyword
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
          locId: item.locId,
          accomTypeNo: item.accomTypeNo,
        };
      })
      .filter(Boolean);

    filteredData.forEach((accom, idx) => {
      //console.log(accom);
      const position = new kakao.maps.LatLng(accom.lat, accom.lon);

      const container = document.createElement('div');
      container.className = 'customoverlay-wrapper';

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
      });

      overlay.setMap(map);

      const bubble = container.querySelector('.price-bubble');

      bubble.addEventListener('click', () => {
        document.querySelectorAll('.text__box').forEach((el) => {
          container.parentElement.style.zIndex = 0;

          el.style.opacity = '0';
          el.style.visibility = 'hidden';
        });

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
  }, [mapRef.current, filterState]);

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
        onClick={handleClose}
      >
        <TiDelete />
      </button>
      <div className='filter-map'>
        <FilterPanel />
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
