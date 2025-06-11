import React from 'react';
import AccommodationCard from './card/AccommodationCard.component';
import { useFilterState } from '../../hooks/useFilterState.hook';

const AccommodationListBox = ({ filteredAccommodations, filterHook }) => {
  const { filter } = filterHook;

  return (
    <ul className='accom-list-ul'>
      {filteredAccommodations.map((accom, idx) => (
        <React.Fragment key={accom.accomSq || idx}>
          <AccommodationCard
            accom={accom}
            filterHook={filterHook}
          />
          <div className='item-line' />
        </React.Fragment>
      ))}
    </ul>
  );
};
export default AccommodationListBox;
