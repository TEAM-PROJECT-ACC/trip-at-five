import React, { useEffect } from 'react';
import {
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
} from '../../../../../assets/icons/ys/index';
import useFilterStore from '../../store/useFilterStore';
import './filter.style.scss';

const FacilityFilter = () => {
  const selectedFacilities = useFilterStore(
    (state) => state.selectedFacilities
  );
  const toggleFacility = useFilterStore((state) => state.toggleFacility);

  const renderButtons = (facilities) =>
    facilities.map(({ icon, label }) => (
      <button
        key={label}
        title={label}
        className={`filter-btn ${
          selectedFacilities.includes(label) ? 'selected' : ''
        }`}
        onClick={() => toggleFacility(label)}
      >
        {icon}
      </button>
    ));

  const publicFacilities = [
    { icon: <FaSpa />, label: '사우나' },
    { icon: <FaSwimmer />, label: '수영장' },
    { icon: <FaDrumstickBite />, label: '바비큐' },
    { icon: <MdOutlineRestaurant />, label: '레스토랑' },
    { icon: <FaDumbbell />, label: '피트니스' },
    { icon: <FaSwimmingPool />, label: '물놀이시설' },
    { icon: <FaShower />, label: '공용샤워실' },
    { icon: <FaRestroom />, label: '공용화장실' },
    { icon: <FaStore />, label: '매점' },
  ];

  const roomFacilities = [
    { icon: <FaHotTub />, label: '스파/월풀' },
    { icon: <FaBath />, label: '객실스파' },
    { icon: <MdLocalBar />, label: '미니바' },
    { icon: <MdOutlineRssFeed />, label: '무선인터넷' },
    { icon: <MdAcUnit />, label: '에어컨' },
    { icon: <FaPumpSoap />, label: '욕실용품' },
    { icon: <MdShower />, label: '샤워실' },
    { icon: <FaPlug />, label: '개인콘센트' },
  ];

  const etcFacilities = [
    { icon: <MdFreeBreakfast />, label: '조식제공' },
    { icon: <FaParking />, label: '무료주차' },
    { icon: <FaDog />, label: '반려견동반' },
    { icon: <FaShuttleVan />, label: '픽업서비스' },
    { icon: <FaSmoking />, label: '객실내흡연' },
    { icon: <MdLuggage />, label: '짐보관가능' },
    { icon: <BiCabinet />, label: '개인사물함' },
    { icon: <WiFire />, label: '캠프파이어' },
    { icon: <FaBurn />, label: '찜질방' },
    { icon: <MdOutlineFoodBank />, label: '객실내취사' },
  ];

  return (
    <>
      <div className='filter-group'>
        <h4 className='sub-title'>공용시설</h4>
        <div className='filter-options'>{renderButtons(publicFacilities)}</div>
      </div>
      <div className='line'></div>
      <div className='filter-group'>
        <h4 className='sub-title'>객실 내 시설</h4>
        <div className='filter-options'>{renderButtons(roomFacilities)}</div>
      </div>
      <div className='line'></div>
      <div className='filter-group'>
        <h4 className='sub-title'>기타 시설</h4>
        <div className='filter-options'>{renderButtons(etcFacilities)}</div>
      </div>
    </>
  );
};

export default FacilityFilter;
