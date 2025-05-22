import React, { useEffect } from "react";
import AccommodationCard from "./card/AccommodationCard.component";

const dummyData = [
  {
    name: "서울신라호텔",
    address: "서울 장충동2가 202",
    rating: 1999,
    checkIn: "15:00",
    checkOut: "11:00",
    price: 150000,
  },
  {
    name: "강릉로뎀나무펜션",
    address: "강릉시 안현로",
    rating: 123,
    checkIn: "14:00",
    checkOut: "11:00",
    price: 90000,
  },
  {
    name: "서울신라호텔",
    address: "서울 장충동2가 202",
    rating: 1999,
    checkIn: "15:00",
    checkOut: "11:00",
    price: 150000,
  },
  {
    name: "강릉로뎀나무펜션",
    address: "강릉시 안현로",
    rating: 123,
    checkIn: "14:00",
    checkOut: "11:00",
    price: 90000,
  },
];
const AccommodationList = () => {
  return (
    <ul>
      {dummyData.map((accom, idx) => (
        <React.Fragment key={idx}>
          <AccommodationCard accom={accom} />
          <div className="item-line"></div>
        </React.Fragment>
      ))}
    </ul>
  );
};

export default AccommodationList;
