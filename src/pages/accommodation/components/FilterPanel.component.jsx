import { FaHotel } from "../../../assets/icons/ys/index";
import "./FilterPanel.style.css";
const FilterPanel = () => {
  return (
    <div className="filter-panel">
      <h3>필터</h3>

      <div className="filter-group">
        <label>숙소 유형</label>
        <div className="filter-options">
          <button id="filter-btn">
            <FaHotel />
          </button>
          <button id="filter-btn">
            <FaHome />
          </button>
          <button id="filter-btn">
            <FaHome />
          </button>
          <button id="filter-btn">
            <FaHome />
          </button>
        </div>
      </div>

      <div className="filter-group">
        <label>시설</label>
        <div className="filter-options">
          <button>
            <FaCar />
          </button>
          <button>
            <FaWifi />
          </button>
          <button>
            <FaUtensils />
          </button>
        </div>
      </div>

      <div className="filter-group">
        <label>기타</label>
        <div className="filter-options">
          <button>
            <FaPaw />
          </button>
          <button>
            <MdSmokeFree />
          </button>
        </div>
      </div>
    </div>
  );
};
export default FilterPanel;
