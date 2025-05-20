import Slider from "rc-slider";
import {
  FaBed,
  MdVilla,
  FaHotel,
  Mdhouse,
  FaCampground,
  FaHouseUser,
} from "../../../assets/icons/ys/index";

const FilterPanel = () => {
  return (
    <div className="filter-panel">
      <div className="filter-group">
        <label>숙소 유형</label>
        <div className="filter-options">
          <button id="filter-btn">
            <FaBed />
          </button>
          <button id="filter-btn">
            <FaHotel />
          </button>
          <button id="filter-btn">
            <Mdhouse />
          </button>
          <button id="filter-btn">
            <MdVilla />
          </button>
          <button id="filter-btn">
            <FaCampground />
          </button>
          <button id="filter-btn">
            <FaHouseUser />
          </button>
        </div>
      </div>
      <hr />
      <div className="filter-group">
        <label>가격</label>
        <Slider />
      </div>
      <div className="filter-group">
        <label>시설</label>
        <h3>공용시설</h3>
        <div className="filter-options">
          <button></button>
          <button></button>
          <button></button>
        </div>
        <hr />
        <h3>객실 내 시설</h3>
        <div className="filter-options">
          <button></button>
          <button></button>
          <button></button>
        </div>
        <hr />
        <h3>기타 시설</h3>
        <div className="filter-options">
          <button></button>
          <button></button>
          <button></button>
        </div>
      </div>
      <hr />
    </div>
  );
};
export default FilterPanel;
