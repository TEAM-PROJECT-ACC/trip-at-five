import React, { useEffect } from "react";
import AccommodationCard from "./card/AccommodationCard.component";

const AccommodationList = ({ data }) => {
  return (
    <ul>
      {data.map((accom, idx) => (
        <React.Fragment key={accom.id || idx}>
          <AccommodationCard accom={accom} />
          <div className="item-line" />
        </React.Fragment>
      ))}
    </ul>
  );
};

export default AccommodationList;
