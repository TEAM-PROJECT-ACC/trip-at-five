import { KakaoMap } from './KakaoMap.component';
import { useState, useEffect } from 'react';
import './mapButton.style.scss';

const MapButton = ({ allAccommodations }) => {
  const [showMap, setShowMap] = useState(false);

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
        onClick={() => setShowMap(true)}
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
