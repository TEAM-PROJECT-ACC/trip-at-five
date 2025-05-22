import React from "react";
import { FaBed, FaHotel } from "../../../../assets/icons/ys/index";
import { MdHouse, MdVilla } from "../../../../assets/icons/ys/index";
import { FaCampground, FaHouseUser } from "../../../../assets/icons/ys/index";
import useFilterStore from "../store/useFilterStore";

const CategoryFilter = () => {
  const setCategory = useFilterStore((state) => state.setCategory);

  const handleClick = (category) => {
    setCategory(category);
    console.log("Selected category:", category);
  };

  return (
    <div className="filter-group">
      <h3>숙소 유형</h3>
      <div className="filter-options">
        <div className="filter-level">
          <button className="filter-btn" onClick={() => handleClick("bed")}>
            <FaBed />
          </button>
          <button className="filter-btn" onClick={() => handleClick("hotel")}>
            <FaHotel />
          </button>
          <button className="filter-btn" onClick={() => handleClick("house")}>
            <MdHouse />
          </button>
          <button className="filter-btn" onClick={() => handleClick("villa")}>
            <MdVilla />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
