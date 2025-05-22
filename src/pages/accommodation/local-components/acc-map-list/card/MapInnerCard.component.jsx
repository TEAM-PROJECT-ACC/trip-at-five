import React from "react";
import "./MapInnerCard.style.scss";

const MapInnerCard = ({ accom }) => {
  return (
    <>
      <li className="acc-list__box">
        <div className="acc-list-img"></div>
        <div className="acc-list-info">
          <div className="acc-list-title">{accom.name}</div>
          <div className="acc-list-price">
            <strong>₩{accom.price.toLocaleString()}</strong>원
          </div>
        </div>
      </li>
      <div className="line"></div>
    </>
  );
};

export default MapInnerCard;
