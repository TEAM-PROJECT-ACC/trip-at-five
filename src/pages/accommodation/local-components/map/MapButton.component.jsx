import React from 'react';
import { KakaoMap } from './KakaoMap.component';
import { useState, useEffect } from 'react';
import { useFilterStore } from '../../../../states/accom-filter/filterStore';
import './mapButton.style.scss';

const MapButton = ({ allAccommodations }) => {
  const [showMap, setShowMap] = useState(false);
  // 필터 초기화
  const resetFilters = useFilterStore((state) => state.resetFilters);

  const handleOpenMap = () => {
    resetFilters(); 
    setShowMap(true);
  };

  useEffect(() => {
    if (showMap) {
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 100);
    }
  }, [showMap]);

  return (
    <div className='map-button'>
      <button
        className='map-btn-text'
        onClick={handleOpenMap}
      >
        지도보기
      </button>
      <div style={{ display: showMap ? 'block' : 'none' }}>
        {showMap && (
          <KakaoMap
            onClose={() => setShowMap(false)}
            allAccommodations={allAccommodations}
          />
        )}
      </div>
    </div>
  );
};
export default MapButton;
