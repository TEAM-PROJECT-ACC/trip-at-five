import MapInnerCard from './card/MapInnerCard.component';
import './mapInnerList.style.scss';

/**
 * 지도 모달창 카드 목록은 숙박업소명 순 정렬 (기본)
 */

export const MapInnerList = ({ accommodations }) => {
  const innerData = (accommodations ?? []).map((accom) => ({
    id: accom.accomSq,
    name: accom.accomName,
    price: accom.roomPrice,
    lat: accom.accomLat,
    lon: accom.accomLon,
    address: accom.accomAddr,
    thumbnail: accom.thumbnail,
  }));

  return (
    <ul className='acc-inner-list'>
      {innerData.length === 0 ? (
        // 해당되는 데이터 없는 경우에만 나오는 메세지
        <li className='no-data-msg'>해당되는 데이터가 없습니다</li>
      ) : (
        innerData.map((accom) => (
          <MapInnerCard
            key={accom.id}
            accom={accom}
          />
        ))
      )}
    </ul>
  );
};
