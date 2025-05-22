import React from "react";
import { innerData } from "./innerData";
import MapInnerCard from "./card/MapInnerCard.component";
import "./MapInnerList.style.scss";

export const MapInnerList = () => {
  return (
    <ul className="acc-inner-list">
      {innerData.map((accom, index) => (
        <MapInnerCard key={index} accom={accom} />
      ))}
    </ul>
  );
};
