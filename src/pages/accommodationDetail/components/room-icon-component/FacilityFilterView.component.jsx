import React from 'react';
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
} from '../../../../assets/icons/ys/index';
import './FacilityFilterView.style.scss';

const FacilityFilterView = ({ selectedFacilities = [] }) => {
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

  const renderIcons = (facilityList, fallbackMessage) => {
    const matchedFacilities = facilityList.filter((fac) =>
      selectedFacilities.includes(fac.label)
    );

    if (matchedFacilities.length === 0) {
      return <div className='facility-none'>{fallbackMessage}</div>;
    }

    return matchedFacilities.map(({ icon, label }) => (
      <div
        key={label}
        className='facility-icon'
        title={label}
      >
        {icon}
        <span className='facility-label'>{label}</span>
      </div>
    ));
  };

  return (
    <div className='facility-view-wrapper'>
      <div className='facility-group'>
        <div className='facility-title'>부대 공용 시설</div>
        <div className='facility-view-grid'>
          {renderIcons(publicFacilities, '부대 공용 시설이 없습니다.')}
        </div>
      </div>
      <div className='blank'></div>
      <div className='facility-group'>
        <div className='facility-title'>기타 시설</div>
        <div className='facility-view-grid'>
          {renderIcons(etcFacilities, '기타 시설이 없습니다.')}
        </div>
      </div>
    </div>
  );
};

export default FacilityFilterView;
