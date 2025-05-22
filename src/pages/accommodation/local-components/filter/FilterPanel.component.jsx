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
import CategoryFilter from "./components/CategoryFilter.component";
import PriceFilter from "./components/PriceFilter.component";
import FacilityFilter from "./components/FacilityFilter.component";
import { useEffect } from "react";

const FilterPanel = () => {
  const state = useFilterStore((state) => state);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <div className="filter-panel__container">
      <CategoryFilter />
      <div className="line"></div>
      <PriceFilter />
      <div className="line"></div>
      <div className="filter-group">
        <h3>시설</h3>
      </div>
      <FacilityFilter />
    </div>
  );
};
export default FilterPanel;
