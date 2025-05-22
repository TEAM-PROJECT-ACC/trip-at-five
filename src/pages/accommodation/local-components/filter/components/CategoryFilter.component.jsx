import React from "react";
import { FaBed, FaHotel } from "../../../../../assets/icons/ys/index";
import { MdHouse, MdVilla } from "../../../../../assets/icons/ys/index";
import {
  FaCampground,
  FaHouseUser,
} from "../../../../../assets/icons/ys/index";
import useFilterStore from "../../store/useFilterStore";
import "./Filter.style.scss";

const CategoryFilter = () => {
  const selectedCategory = useFilterStore((state) => state.selectedCategory);
  const setCategory = useFilterStore((state) => state.setCategory);

  const categoryIcons = [
    { icon: <FaBed />, value: "모텔" },
    { icon: <FaHotel />, value: "호텔/리조트" },
    { icon: <MdHouse />, value: "펜션" },
    { icon: <MdVilla />, value: "홈&빌라" },
    { icon: <FaCampground />, value: "캠핑" },
    { icon: <FaHouseUser />, value: "게하/한옥" },
  ];

  const handleClick = (category) => {
    setCategory(category);
    console.log("Selected category:", category);
  };

  return (
    <div className="filter-group">
      <h3>숙소 유형</h3>
      <div className="filter-options">
        {categoryIcons.map(({ icon, value }) => (
          <button
            key={value}
            className={`filter-btn ${
              selectedCategory === value ? "selected" : ""
            }`}
            onClick={() => handleClick(value)}
          >
            {icon}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
