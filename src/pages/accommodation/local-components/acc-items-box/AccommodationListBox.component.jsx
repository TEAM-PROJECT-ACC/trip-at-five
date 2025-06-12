import React from 'react';
import AccommodationCard from './card/AccommodationCard.component';
import './AccommodationListBox.style.scss';

const AccommodationListBox = ({ filteredAccommodations }) => {
  if (!filteredAccommodations || filteredAccommodations.length === 0) {
    return (
      <ul className='accom-list-ul no-data-list'>
        <li className='no-data-msg'>해당되는 데이터가 없습니다</li>
      </ul>
    );
  }

  return (
    <ul className='accom-list-ul'>
      {filteredAccommodations.map((accom, idx) => (
        <React.Fragment key={accom.accomSq || idx}>
          <AccommodationCard accom={accom} />
          <div className='item-line' />
        </React.Fragment>
      ))}
    </ul>
  );
};
export default AccommodationListBox;
