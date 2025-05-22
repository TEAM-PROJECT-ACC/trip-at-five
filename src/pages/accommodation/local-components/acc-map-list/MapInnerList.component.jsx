import React from "react";
import { innerData } from "./innerData";
import MapInnerCard from "./card/MapInnerCard.component";

export const MapInnerList = () => {
  return (
    <ul className="acc-list">
      {innerData.map((accom, index) => (
        <MapInnerCard key={index} accom={accom} />
      ))}
    </ul>
  );
};
