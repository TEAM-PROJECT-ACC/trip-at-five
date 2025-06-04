import React from 'react';
import AccommodationCard from './card/AccommodationCard.component';
import { useFilterState } from '../../hooks/useFilterState.hook';

const AccommodationListBox = ({ accommodations, filterHook }) => {
  const { filter } = filterHook;
  /*
  const filteredData = filter.selectedCategory
    ? data.filter((accom) => accom.type === filter.selectedCategory)
    : data;
  */
  return (
    <ul className='accom-list-ul'>
      {accommodations.map((accom, idx) => (
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
