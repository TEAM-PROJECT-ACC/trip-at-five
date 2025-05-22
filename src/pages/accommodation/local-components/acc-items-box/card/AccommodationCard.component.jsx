import React from "react";
import { FaHome } from "react-icons/fa";
import "./AccommodationCard.style.scss";

const AccommodationCard = ({ accom }) => {
  return (
    <li className="accommodation-item">
      <div className="image"></div>
      <div className="accom-info">
        <div className="level-one">
          <div className="accom-name">{accom.name}</div>
          <div className="accom-info-icon">
            <FaHome />
          </div>
        </div>
        <p className="accom-address">{accom.address}</p>
        <div className="star">
          <span className="star-icon"></span>
          {accom.rating}명 평가
        </div>
        <div className="accom-info-time-price">
          <div className="v-line"></div>
          <p className="accom-time">{accom.checkIn} 체크인</p>
          <p className="accom-time">{accom.checkOut} 체크아웃</p>
          <p className="accom-price">
            최저가 <strong>{accom.price.toLocaleString()}</strong>원
          </p>
        </div>
      </div>
    </li>
  );
};

export default AccommodationCard;
