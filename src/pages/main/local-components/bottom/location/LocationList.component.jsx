import Card from '../card/Card.component';
import './LocationList.style.scss';

const LocationList = () => {
  // 추후 데이터 불러올것
  const locationName = ['부산', '안동', '인천', '대전', '속초', '강릉'];

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
