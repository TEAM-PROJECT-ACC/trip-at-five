import React from "react";

const AccommodationItem = ({ item }) => {
  return (
    <li className="accommodation-item">
      <div className="image-placeholder" />
      <div className="hotel-info">
        <h2 className="hotel-name">{item.accomName}</h2>
        <p className="hotel-address">{item.accomAddr}</p>
        <p className="hotel-time">🕒 체크인 15:00 | 체크아웃 11:00</p>
        <p className="hotel-price">
          <strong>최저가 </strong>
          {item.price ? `${item.price.toLocaleString()}원` : "문의"}
        </p>
      </div>
    </li>
  );
};
export default AccommodationItem;
