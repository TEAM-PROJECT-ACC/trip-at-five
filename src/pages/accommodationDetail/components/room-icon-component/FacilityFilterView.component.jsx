import React from 'react';
import {
  FaSpa,
  FaSwimmer,
  FaDrumstickBite,
  MdOutlineRestaurant,
  FaShower,
  FaRestroom,
  MdFreeBreakfast,
  FaParking,
  FaSmoking,
  WiFire,
} from '../../../../assets/icons/ys/index';
import './FacilityFilterView.style.scss';

const FacilityFilterView = ({ selectedFacilities = [] }) => {
  const publicFacilities = [
    { icon: <FaSwimmer />, label: '수영장' },
    { icon: <FaSpa />, label: '사우나' },
    { icon: <FaShower />, label: '공용샤워실' },
    { icon: <FaDrumstickBite />, label: '바비큐' },
    { icon: <MdOutlineRestaurant />, label: '레스토랑' },
    { icon: <FaRestroom />, label: '공용화장실' },
  ];

  const etcFacilities = [
    { icon: <MdFreeBreakfast />, label: '조식제공' },
    { icon: <FaParking />, label: '무료주차' },
    { icon: <WiFire />, label: '캠프파이어' },
    { icon: <FaSmoking />, label: '객실내흡연' },
  ];

  const renderIcons = (facility) =>
    facility
      .filter((fac) => selectedFacilities.includes(fac.label))
      .map(({ icon, label }) => (
        <div
          key={label}
          className='facility-icon'
        >
          {icon}
          <span>{label}</span>
        </div>
      ));

  return (
    <div className='facility-view-wrapper'>
      <div className='facility-group'>
        <div className='facility-title'>부대 공용 시설</div>
        {/*<div className='facility-view-grid'>{renderIcons(publicFacilities)}</div>*/}
        <div className='facility-view-grid'>
          <div className='fac-icon'>
            <FaSwimmer />
            <p className='fac-icon__text'>수영장</p>
          </div>
          <div className='fac-icon'>
            <FaSpa />
            <p className='fac-icon__text'>사우나</p>
          </div>
          <div className='fac-icon'>
            <FaShower />
            <p className='fac-icon__text'>공용샤워실</p>
          </div>
          <div className='fac-icon'>
            <FaDrumstickBite />
            <p className='fac-icon__text'>바비큐</p>
          </div>
          <div className='fac-icon'>
            <MdOutlineRestaurant />
            <p className='fac-icon__text'>레스토랑</p>
          </div>
        </div>
      </div>
      <div className='blank'></div>
      <div className='facility-group'>
        <div className='facility-title'>기타 시설</div>
        {/*<div className='facility-view-grid'>{renderIcons(etcFacilities)}</div>*/}
        <div className='facility-view-grid'>
          <div className='fac-icon'>
            <MdFreeBreakfast />
            <p className='fac-icon__text'>무료주차</p>
          </div>
          <div className='fac-icon'>
            <FaSmoking />
            <p className='fac-icon__text'>객실내흡연</p>
          </div>
          <div className='fac-icon'>
            <WiFire />
            <p className='fac-icon__text'>캠프파이어</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityFilterView;
