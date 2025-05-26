import React from 'react';
import { FaBed, FaHotel } from '../../../../../assets/icons/ys/index';
import { MdHouse, MdVilla } from '../../../../../assets/icons/ys/index';
import {
  FaCampground,
  FaHouseUser,
} from '../../../../../assets/icons/ys/index';
import useFilterStore from '../../store/useFilterStore';
import './Filter.style.scss';

const CategoryFilter = () => {
  const selectedCategory = useFilterStore((state) => state.selectedCategory);
  const setCategory = useFilterStore((state) => state.setCategory);

  const categoryIcons = [
    { icon: <FaBed />, value: '모텔', title: '모텔' },
    { icon: <FaHotel />, value: '호텔', title: '호텔' },
    { icon: <MdHouse />, value: '펜션', title: '펜션' },
    { icon: <MdVilla />, value: '홈&빌라', title: '홈&빌라' },
    { icon: <FaCampground />, value: '캠핑', title: '캠핑' },
    { icon: <FaHouseUser />, value: '게하/한옥', title: '게하/한옥' },
  ];

  const handleClick = (category) => {
    if (selectedCategory === category) {
      setCategory('');
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
