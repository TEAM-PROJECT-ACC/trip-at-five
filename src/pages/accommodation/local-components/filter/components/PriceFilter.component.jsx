import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './filter.style.scss';
import { useFilterStore } from '../../../../../states/accom-filter/filterStore';
/**
 * 최대 가격은 500,000원 이상 으로 표기
 */

const PriceFilter = () => {
  const priceRange = useFilterStore((state) => state.priceRange);
  const setPriceRange = useFilterStore((state) => state.setPriceRange);

  const handleChange = (value) => {
    setPriceRange(value);
    console.log('Selected price range:', value);
  };

  return (
    <div className='filter-group'>
      <h3 className='title'>가격</h3>
      <div className='slider-style-length'>
        <Slider
          range
          min={0}
          max={500000}
          step={100}
          value={priceRange}
          onChange={handleChange}
          trackStyle={[{ backgroundColor: '#5500ff' }]}
          handleStyle={[{ borderColor: '#5500ff' }, { borderColor: '#5500ff' }]}
        />
      </div>
      <p className='price-range'>
        ₩{priceRange[0].toLocaleString()} ~ {priceRange[1] === 500000 ? '₩500,000+' : `₩${priceRange[1].toLocaleString()}`}
      </p>
    </div>
  );
};

export default PriceFilter;
