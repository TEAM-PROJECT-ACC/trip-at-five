import React from 'react';
import {
  FaBuilding,
  FaHotel,
  TbBeach,
  MdHouse,
  FaCampground,
  FaHouseUser,
} from '../../../../../assets/icons/ys/index';
import './filter.style.scss';
import { useFilterStore } from '../../../../../states/accom-filter/filterStore';

/**
 * 모텔, 호텔, 리조트, 펜션, 캠핑, 게스트하우스/한옥
 */

const CategoryFilter = () => {

  const selectedCategory = useFilterStore((state) => state.selectedCategory);
  const setCategory = useFilterStore((state) => state.setCategory);

  const categoryIcons = [
    { icon: <FaBuilding />, value: 21, title: '모텔' },
    { icon: <FaHotel />, value: 22, title: '호텔' },
    { icon: <TbBeach />, value: 23, title: '리조트' },
    { icon: <MdHouse />, value: 24, title: '펜션' },
    { icon: <FaCampground />, value: 25, title: '캠핑' },
    { icon: <FaHouseUser />, value: 26, title: '게하/한옥' },
  ];

  const handleClick = (category) => {
    if (selectedCategory === category) {
      setCategory(null);
    } else {
      setCategory(category);
    }
  };

  return (
    <div className='filter-group'>
      <h3 className='title'>숙소 유형</h3>
      <div className='filter-options'>
        {categoryIcons.map(({ icon, value, title }) => (
          <button
            title={title}
            key={value}
            className={`filter-btn ${
              selectedCategory === value ? 'selected' : ''
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
