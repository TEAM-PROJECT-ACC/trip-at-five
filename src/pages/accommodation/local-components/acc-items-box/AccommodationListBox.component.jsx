import React from 'react';
import AccommodationCard from './card/AccommodationCard.component';

const AccommodationListBox = ({ filteredAccommodations }) => {

  return (
    <ul className='accom-list-ul'>
      {filteredAccommodations.map((accom, idx) => (
        <React.Fragment key={accom.accomSq || idx}>
          <AccommodationCard
            accom={accom}
          />
          <div className='item-line' />
        </React.Fragment>
      ))}
    </ul>
  );
};
export default AccommodationListBox;
