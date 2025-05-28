import Card from '../card/Card.component';
import './LocationList.style.scss';

const LocationList = () => {
  // 추후 데이터 불러올것
  const locationName = [
    '서울',
    '인천',
    '부산',
    '강원',
    '제주',
    '전남',
    '전북',
    '경기',
  ];

  return (
    <div className='location-list__container'>
      {locationName.map((name, idx) => {
        return (
          <Card
            key={idx}
            className='card'
            cardText={name}
          />
        );
      })}
    </div>
  );
};

export default LocationList;
