import React from 'react';
import AccommodationCard from './card/AccommodationCard.component';
import useFilterStore from '../store/useFilterStore';

const AccommodationListBox = ({ data }) => {
  const selectedCategory = useFilterStore((state) => state.selectedCategory);

  const filteredData = selectedCategory
    ? data.filter((accom) => accom.type === selectedCategory)
    : data;

  return (
    <ul>
      {filteredData.map((accom, idx) => (
        <React.Fragment key={accom.id || idx}>
          <AccommodationCard accom={accom} />
          <div className="item-line" />
        </React.Fragment>
      ))}
    </ul>
  );
};

export default AccommodationListBox;
