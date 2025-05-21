import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import {
  FaBed,
  MdVilla,
  FaHotel,
  MdHouse,
  FaCampground,
  FaHouseUser,
  FaSpa,
  FaSwimmer,
  FaDrumstickBite,
  MdOutlineRestaurant,
  FaDumbbell,
  FaSwimmingPool,
  FaShower,
  FaRestroom,
  FaStore,
  FaHotTub,
  FaBath,
  MdLocalBar,
  MdOutlineRssFeed,
  MdAcUnit,
  FaPumpSoap,
  MdShower,
  FaPlug,
  MdFreeBreakfast,
  FaParking,
  FaDog,
  FaShuttleVan,
  FaSmoking,
  MdLuggage,
  BiCabinet,
  WiFire,
  FaBurn,
  MdOutlineFoodBank,
} from "../../../../assets/icons/ys/index";
import "./FilterPanel.style.scss";
import useFilterStore from "../store/useFilterStore";

const FilterPanel = () => {
  const priceRange = useFilterStore((state) => state.priceRange);
  const setPriceRange = useFilterStore((state) => state.setPriceRange);
  return (
    <div className="filter-panel__container">
      <div className="filter-group">
        <h3>숙소 유형</h3>
        <div className="filter-options">
          <div className="filter-level">
            <button id="filter-btn">
              <FaBed />
            </button>
            <button id="filter-btn">
              <FaHotel />
            </button>
            <button id="filter-btn">
              <MdHouse />
            </button>
            <button id="filter-btn">
              <MdVilla />
            </button>
          </div>
          <div className="filter-level">
            <button id="filter-btn">
              <FaCampground />
            </button>
            <button id="filter-btn">
              <FaHouseUser />
            </button>
          </div>
        </div>
      </div>
      <div className="line"></div>
      <div className="filter-group">
        <h3>가격</h3>
        <div className="slider-style-length">
          <Slider
            range
            min={0}
            max={1000000}
            step={10000}
            value={priceRange}
            trackStyle={[{ backgroundColor: "#5500ff" }]}
            handleStyle={[
              { borderColor: "#5500ff" },
              { borderColor: "#5500ff" },
            ]}
            onChange={setPriceRange}
          />
        </div>
        <p style={{ color: "#888", marginTop: "10px" }}>
          ₩{priceRange[0].toLocaleString()} ~ ₩{priceRange[1].toLocaleString()}
        </p>
      </div>
      <div className="line"></div>
      <div className="filter-group">
        <h3>시설</h3>
      </div>
      <div className="filter-group">
        <h4 id="together">공용시설</h4>
        <div className="filter-options">
          <div className="filter-level">
            <button id="filter-btn">
              <FaSpa />
            </button>
            <button id="filter-btn">
              <FaSwimmer />
            </button>
            <button id="filter-btn">
              <FaDrumstickBite />
            </button>
            <button id="filter-btn">
              <MdOutlineRestaurant />
            </button>
          </div>
          <div className="filter-level">
            <button id="filter-btn">
              <FaDumbbell />
            </button>
            <button id="filter-btn">
              <FaSwimmingPool />
            </button>
            <button id="filter-btn">
              <FaShower />
            </button>
            <button id="filter-btn">
              <FaRestroom />
            </button>
          </div>
          <div className="filter-level">
            <button id="filter-btn">
              <FaStore />
            </button>
          </div>
        </div>
      </div>
      <div className="line"></div>
      <div className="filter-group">
        <h4>객실 내 시설</h4>
        <div className="filter-options">
          <div className="filter-level">
            <button id="filter-btn">
              <FaHotTub />
            </button>
            <button id="filter-btn">
              <FaBath />
            </button>
            <button id="filter-btn">
              <MdLocalBar />
            </button>
            <button id="filter-btn">
              <MdOutlineRssFeed />
            </button>
          </div>
          <div className="filter-level">
            <button id="filter-btn">
              <MdAcUnit />
            </button>
            <button id="filter-btn">
              <FaPumpSoap />
            </button>
            <button id="filter-btn">
              <MdShower />
            </button>
            <button id="filter-btn">
              <FaPlug />
            </button>
          </div>
        </div>
      </div>
      <div className="line"></div>
      <div className="filter-group">
        <h4>기타 시설</h4>
        <div className="filter-options">
          <div className="filter-level">
            <button id="filter-btn">
              <MdFreeBreakfast />
            </button>
            <button id="filter-btn">
              <FaParking />
            </button>
            <button id="filter-btn">
              <FaDog />
            </button>
            <button id="filter-btn">
              <FaShuttleVan />
            </button>
          </div>
          <div className="filter-level">
            <button id="filter-btn">
              <FaSmoking />
            </button>
            <button id="filter-btn">
              <MdLuggage />
            </button>
            <button id="filter-btn">
              <BiCabinet />
            </button>
            <button id="filter-btn">
              <WiFire />
            </button>
          </div>
          <div className="filter-level">
            <button id="filter-btn">
              <FaBurn />
            </button>
            <button id="filter-btn">
              <MdOutlineFoodBank />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FilterPanel;
